import { Params } from '@/core/fetch'
import { emitter, useResolveRoute } from '@/hooks'

let hasRender = __isBrowser__ && !!window.__USE_SSR__

const layoutFetch = async (ctx: any, router: Params['router']) => {
  const route = useResolveRoute(router)
  let payload: Record<string, any> = {
    route,
  }
  if (!hasRender) {
    payload = Object.assign(payload, {
      settings: {
        name: 'Kova',
      },
    })
    hasRender = true
  }
  return payload
}

export default async function ({ router, store }: Params, ctx: any) {
  console.log('window.__VUE_APP__', window.__VUE_APP__)
  console.log('store', store)
  return await layoutFetch(ctx, router).then((res) => {
    emitter.emit('layout')
    return res
  })
}
