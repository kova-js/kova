import { getPageNamespace, useResolveRoute } from '@/hooks'
import { ISSRContext } from 'ssr-types-react'
import { emitter } from '../emits'
export interface Meta {
  title: string
  description?: string
}

export type LayoutType = 'blog' | 'auth' | 'admin' | 'blank' | 'error'

export interface Theme {}

export type FetchData = Record<string, any> & {
  theme?: Theme
  meta: Meta
}

export type FetchDataResult = Promise<FetchData>

import { ParsedUrlQuery } from 'querystring'

import { IncomingMessage, ServerResponse } from 'http'

export type PageMeta = {
  title?: string
  description?: string
  keywords?: string | string[]
}

export type GetServerSidePropsResult<P> = { props: P; meta?: PageMeta }

export type GetServerSidePropsContext<S extends { [key: string]: any } = { [key: string]: any }> = S & {
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

export function WrapFetch<P extends { [key: string]: any } = { [key: string]: any }>(
  asyncData: GetServerSideProps<P>,
): (ctx: ISSRContext<any>) => FetchDataResult {
  return async function (ctx: ISSRContext<any>): Promise<any> {
    const route = useResolveRoute(ctx)
    const namespace = getPageNamespace(route.match)

    const res = await asyncData({
      ...ctx,
      req: ctx?.request as IncomingMessage,
      res: ctx?.response as ServerResponse,
      params: route.params,
      query: route.query,
      resolvedUrl: '',
    })
    const { props, ...rest } = res
    emitter.emit('page')
    return {
      ...rest,
      [namespace]: props,
    }
  }
}

// export type GetInitialProps<
//   S extends { [key: string]: any } = {},
//   P extends { [key: string]: any } = { [key: string]: any },
// > = (ctx: GetServerSidePropsContext<S>) => Promise<GetServerSidePropsResult<P>>
//
// export function getInitialProps<
//   S extends { [key: string]: any } = {},
//   P extends { [key: string]: any } = { [key: string]: any },
// >(asyncData: GetInitialProps<S, P>): (ctx: ISSRContext<S>) => FetchDataResult {
//   return async function (ctx: ISSRContext<S>) {
//     const route = useResolveRoute(ctx)
//     const namespace = getPageNamespace(route.match)
//
//     const res = await asyncData({
//       ...ctx,
//       req: ctx?.request as IncomingMessage,
//       res: ctx?.response as ServerResponse,
//       params: route.params,
//       query: route.query,
//       resolvedUrl: '',
//     })
//     const { props, ...rest } = res
//     return {
//       ...rest,
//       [namespace]: props,
//     }
//   }
// }
