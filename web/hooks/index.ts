import type { ParsedUrlQuery } from 'querystring'
import { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import ReactRouter, { matchPath } from 'react-router'
// import { camelCase } from 'lodash'
import mitt, { Emitter as MittEmitter } from 'mitt'
import type { IContext } from 'ssr-types-react'
// @ts-ignore
import { FeRoutes } from '@/../build/ssr-temporary-routes'
export { useEnhancedEffect } from './useEnhancedEffect'

export function useGlobalState() {
  const { state, dispatch } = useContext<IContext>(window.STORE_CONTEXT)
  return {
    state: state,
    dispatch: dispatch!,
  }
}

export const emitter: MittEmitter<Record<string, any>> = mitt()

if (__isBrowser__) {
  emitter.on('layout', () => {
    console.log('layout')
  })
  emitter.on('page', () => {
    console.log('page')
  })
}

export const getPagePath = (path: string) =>
  __isBrowser__ ? useRouteMatch().path : global.window.STORE_CONTEXT?.[0]?.route?.match

// export function getPageNamespace(path?: string) {
//   path = path || getPagePath(path)
//   const key = !path || path === '/' ? 'index' : path
//   return `${key}-data`
// }

export function useMeta() {
  const { state } = useContext<IContext>(window.STORE_CONTEXT)

  const meta = useMemo(() => (state && state.meta ? state.meta : {}), [state.meta])

  useEffect(() => {
    console.log(meta)
  }, [meta])

  return meta
}

export function usePageState(pageNamespace?: string) {
  // const key = pageNamespace || getPageNamespace()
  const { state, dispatch } = useContext<IContext>(window.STORE_CONTEXT)
  // console.log(key)
  const key = 'pageProps'

  const pageState = useMemo(() => (state && state[key] ? state[key] : {}), [state, key])

  const dispatchPageState = (payload: any) => {
    return dispatch?.({
      type: 'updatePageState',
      payload: {
        key,
        ...payload,
      },
    })
  }

  useEffect(() => {
    return () => {
      dispatchPageState(null)
    }
  }, [])

  return [pageState, dispatchPageState]
}

export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

export const useQuery = (): ParsedUrlQuery =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  __isBrowser__ ? useMemo(() => qs.parse(location.search.slice(1)), [location.search]) : {}

export interface ResolveRoute {
  query: ParsedUrlQuery
  path: string
  match: string
  params: {
    [key: string]: string
  }
}

function getQueryBySearch(search: string) {
  return Object.fromEntries(new URLSearchParams(search))
}

export function useResolveRoute(ctx: any): ResolveRoute {
  if (__isBrowser__) {
    const { match } = ctx
    const { pathname: path, search } = location
    const query = getQueryBySearch(search)
    return {
      query,
      params: match.params,
      match: match.path,
      path,
    }
  } else {
    const { query, path } = ctx.request
    const matchOptions = { exact: true, strict: false, sensitive: false }
    let match!: ReactRouter.match
    for (const route of FeRoutes) {
      const matchRoute = matchPath(path, { path: route.path, ...matchOptions })
      if (matchOptions.exact && matchRoute?.isExact) {
        match = matchRoute
        break
      }
    }
    return {
      query,
      params: match.params,
      match: match.path,
      path,
    }
  }
}
