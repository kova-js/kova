import { useResolveRoute } from '@/hooks'
import type { IncomingMessage, ServerResponse } from 'http'
import type { ParsedUrlQuery } from 'querystring'
import { ISSRContext } from 'ssr-types'
import { emitter } from '../emits'
import { Store } from 'vuex'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export interface Meta {
  title: string
  description?: string
}

export type LayoutType = 'blog' | 'auth' | 'admin' | 'blank' | 'error'

export interface Theme {
  mode: 'dark' | 'light'
}

export type FetchData = Record<string, any> & {
  theme?: Theme
  meta: Meta
}

export type FetchDataResult = Promise<FetchData>

export type PageMeta = {
  title?: string
  description?: string
  keywords?: string | string[]
}

export type GetServerSidePropsResult<P> = { props: P; meta?: PageMeta }

export type GetServerSidePropsContext<S extends { [key: string]: any } = { [key: string]: any }> =
  S & {
    req?: IncomingMessage & {
      // cookies: NextApiRequestCookies
    }
    res?: ServerResponse
    params: ParsedUrlQuery
    query: ParsedUrlQuery
    resolvedUrl: string
  }

export type GetServerSideProps<P extends { [key: string]: any } = { [key: string]: any }> = (
  ctx: GetServerSidePropsContext<any>,
) => Promise<GetServerSidePropsResult<P>>

export type Params = {
  store: Store<any>
  router: RouteLocationNormalizedLoaded
}

export function WrapFetch<P extends { [key: string]: any } = { [key: string]: any }>(
  asyncData: GetServerSideProps<P>,
): ({ store, router }: Params, ctx?: ISSRContext<any>) => FetchDataResult {
  return async function ({ router, store }: Params, ctx: ISSRContext<any>): Promise<any> {
    const route = useResolveRoute(router)

    const res = await asyncData({
      ...ctx,
      req: ctx.request,
      res: ctx.response,
      params: route.params,
      query: route.query,
      resolvedUrl: '',
      store,
    })
    const { props, ...rest } = res
    emitter.emit('page')
    return {
      ...rest,
      pageProps: props,
    }
  }
}
