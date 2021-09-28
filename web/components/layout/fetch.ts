import { emitter, useResolveRoute } from '@/hooks'
import { promiseTimeout } from '@/utils'

let hasRender = __isBrowser__ && !!window.__USE_SSR__

const layoutFetch = async (ctx: any) => {
  const route = useResolveRoute(ctx)
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
  await promiseTimeout(200)
  return payload
  // return pickBy(payload, identity)
}

export default function (ctx: any) {
  return new Promise((resolve) => {
    layoutFetch(ctx).then((res) => {
      resolve(res)
      emitter.emit('layout')
    })
  })
}
