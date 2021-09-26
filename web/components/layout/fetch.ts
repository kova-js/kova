import { emitter, useResolveRoute } from '@/hooks'
import { promiseTimeout } from '@/utils'

let hasRender = __isBrowser__ && !!window.__USE_SSR__

const layoutFetch = async (ctx: any) => {
  console.log('ctx.match', ctx.match)
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
}

export default function (ctx: any) {
  return new Promise((resolve) => {
    layoutFetch(ctx).then((res) => {
      resolve(res)
      emitter.emit('layout')
    })
  })
}
