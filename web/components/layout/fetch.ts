import { emitter, useResolveRoute } from '@/hooks'
import _ from 'lodash'

let hasRender = __isBrowser__ && !!window.__USE_SSR__

const layoutFetch = async (ctx: any) => {
  try {
    const route = useResolveRoute(ctx)
    let payload: Record<string, any> = {
      route,
      // me: ctx?.request?.user,
    }
    if (!hasRender) {
      payload = Object.assign(payload, {
        settings: {
          name: 'Kova',
        },
      })
      hasRender = true
    }
    return _.pickBy(payload, _.identity)
  } catch (e) {
    console.log(e)
  }
}

export default function (ctx: any) {
  return new Promise((resolve) => {
    layoutFetch(ctx).then((res) => {
      resolve(res)
      emitter.emit('layout')
    })
  })
}
