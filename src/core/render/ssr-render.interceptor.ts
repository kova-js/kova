import { isOnlyApi } from '@/utils'
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import crypto from 'crypto'
import { Response } from 'express-serve-static-core'
import { isEmpty } from 'lodash'
import { firstValueFrom, Observable, of } from 'rxjs'
import { render } from './render'
import { UserConfig } from 'ssr-types'
import { Readable, Stream } from 'stream'
import { CacheService } from '../cache'
import { RedirectException } from '../exceptions/redirect.exception'
import { SSR_RENDER_METADATA } from './ssr-render.constants'
import { isDev } from '@/utils'
import config from '@/core/config'
import { parseFeRoutes } from './render'
import { matchPath } from 'react-router'

const md5 = (key: string) => crypto.createHash('md5').update(key).digest('hex')

function getMatch(feRoutes: any, path: string) {
  const matchOptions = { exact: true, strict: false, sensitive: false }
  let match = {} as any
  for (const route of feRoutes) {
    const matchRoute = matchPath(path, { path: route.path, ...matchOptions })
    if (matchOptions.exact && matchRoute?.isExact) {
      match = matchRoute
      break
    }
  }
  return match
}

export interface SsrRenderOptions {
  stream?: boolean
  cache?: boolean
  mode?: 'csr' | 'ssr'
}

@Injectable()
export class SsrRenderInterceptor implements NestInterceptor {
  @Inject(Reflector)
  protected readonly reflector: Reflector
  protected renderContext: any

  @Inject(CacheService)
  private readonly cache: CacheService

  private readonly config: UserConfig = {
    parallelFetch: true,
    stream: false,
  }

  static feRoutes = []

  static async parseRoutes() {
    if (isEmpty(SsrRenderInterceptor.feRoutes)) {
      this.feRoutes = await parseFeRoutes()
    }
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    // await parseFeRoutes()
    const http = context.switchToHttp()
    const req = http.getRequest()
    const res = http.getResponse<Response>()
    if (isOnlyApi) {
      throw new NotFoundException(`Cannot ${req.method} ${req.path}`)
    }
    const ssrRenderMeta = this.reflector.get(SSR_RENDER_METADATA, context.getHandler())
    const { cache = false, ...options } = ssrRenderMeta || {}
    const mode = req.query.csr === 'true' ? 'csr' : options?.mode ?? 'ssr'
    let result: any
    let key: string
    const url = req.url
    // let disableCache = isDev || req.get('cache-control') === 'no-cache'
    const disableCache = false && isDev
    const bundleVersion = config('app.bundleId')
    if (!disableCache && cache) {
      key = `v${bundleVersion}_${req.path.replace(/[\/?=]/g, '')}_${md5(req.url)}`
      result = await this.cache.get(key)
    }

    if (!isEmpty(result)) {
      return of(result)
    }

    try {
      if (mode === 'ssr') {
        result = await firstValueFrom(next.handle())
      }
      this.renderContext = {
        request: req,
        response: {},
        match: getMatch(SsrRenderInterceptor.feRoutes, url),
        ...result,
      }
      res.contentType('text/html')
      const content = await this.getRenderContent({
        ...this.config,
        ...options,
        mode,
      })
      if (content instanceof Stream) {
        await this.sendStream(res, content)
      } else {
        if (key) {
          this.cache.set(key, content, 300).then(() => {
            console.log('cache success')
          })
        }
        return of(content)
      }
    } catch (error) {
      console.log(error)
      if (error instanceof RedirectException) {
        res.redirect(error.getRedirectUrl())
      } else {
        throw new InternalServerErrorException(error.message)
      }
    }
  }

  async getRenderContent(options: any) {
    const { mode } = options
    if (mode === 'csr') {
      return await this.renderCsr(options)
    }

    try {
      return await render<Readable>(this.renderContext, options)
    } catch (error) {
      if (mode !== 'csr' && mode !== 'ssr') {
        return await this.renderCsr(options)
      } else {
        throw error
      }
    }
  }

  sendStream(res: Response, stream) {
    return new Promise<void>((resolve, reject) => {
      stream.pipe(res, { end: false })
      stream.on('end', () => {
        res.end()
        resolve()
      })
      stream.on('error', (err) => {
        reject(err)
      })
    })
  }

  async renderCsr(options) {
    return await render<Readable>(this.renderContext, {
      ...this.config,
      mode: 'csr',
      ...options,
    })
  }
}
