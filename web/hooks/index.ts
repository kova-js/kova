import mitt, { Emitter as MittEmitter } from 'mitt'

type ParsedUrlQuery = Record<
  string,
  string | number | boolean | string[] | number[] | boolean[] | null
>

export const emitter: MittEmitter<Record<string, any>> = mitt()

export const queryParse = (search: string) => Object.fromEntries(new URLSearchParams(search))

export interface ResolveRoute {
  query: ParsedUrlQuery
  path: string
  match: string
  params: {
    [key: string]: string
  }
}

export function useResolveRoute(router: any): ResolveRoute {
  return {
    query: router.query ?? {},
    params: router.params,
    match: router.path,
    path: router.path,
  }
}
