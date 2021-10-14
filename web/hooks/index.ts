import mitt, { Emitter as MittEmitter } from 'mitt'
// import type { ISSRContext } from 'ssr-types'
// import qs from 'querystring'

type ParsedUrlQuery = Record<
  string,
  string | number | boolean | string[] | number[] | boolean[] | null
>

// export function useGlobalState() {
//   const { state, dispatch } = useContext<IContext>(window.STORE_CONTEXT)
//   return {
//     state: state,
//     dispatch: dispatch!,
//   }
// }

export const emitter: MittEmitter<Record<string, any>> = mitt()

if (__isBrowser__) {
  emitter.on('layout', () => {
    console.log('layout')
  })
  emitter.on('page', () => {
    console.log('page')
  })
}

// export const getPagePath = (path: string) =>
//   __isBrowser__ ? useRouteMatch().path : global.window.STORE_CONTEXT?.[0]?.route?.match

// export function useMeta() {
//   const { state } = useContext<IContext>(window.STORE_CONTEXT)

//   const meta = useMemo(() => (state && state.meta ? state.meta : {}), [state.meta])

//   useEffect(() => {
//     // console.log(meta)
//   }, [meta])

//   return meta
// }

// export function usePageState(pageNamespace?: string) {
//   // const key = pageNamespace || getPageNamespace()
//   const { state, dispatch } = useContext<IContext>(window.STORE_CONTEXT)
//   // console.log(key)
//   const key = 'pageProps'

//   const pageState = useMemo(() => (state && state[key] ? state[key] : {}), [state, key])

//   const dispatchPageState = (payload: any) => {
//     return dispatch?.({
//       type: 'updatePageState',
//       payload: {
//         key,
//         ...payload,
//       },
//     })
//   }

//   useEffect(() => {
//     return () => {
//       dispatchPageState(null)
//     }
//   }, [])

//   return [pageState, dispatchPageState]
// }

export const queryParse = (search: string) => Object.fromEntries(new URLSearchParams(search))

// export const useQuery = (): ParsedUrlQuery =>
//   __isBrowser__ ? useMemo(() => queryParse(location.search), [location.search]) : {}

export interface ResolveRoute {
  query: ParsedUrlQuery
  path: string
  match: string
  params: {
    [key: string]: string
  }
}

export function useResolveRoute(ctx: any, router?: any): ResolveRoute {
  if (__isBrowser__ && router) {
    const { matched } = router
    const match = matched[0]
    const { pathname: path, search } = location
    const query = queryParse(search)
    return {
      query,
      params: match.params,
      match: match.path,
      path,
    }
  } else {
    const { request, match } = ctx
    const { query, path } = request
    return {
      query,
      params: match.params,
      match: match.path,
      path,
    }
  }
}
