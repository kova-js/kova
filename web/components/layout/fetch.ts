import { Params } from '@/core/fetch'
import { emitter, useResolveRoute } from '@/hooks'
import { request } from '@/utils/fetch'

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

// export default async function ({ router, store }: Params, ctx: any) {
//   console.log('window.__VUE_APP__', window.__VUE_APP__)
//   console.log('store', store)
//   return  await layoutFetch(ctx, router)
//   // return new Promise((resolve) => {
//   //   layoutFetch(ctx, router).then((res) => {
//   //     resolve(res)
//   //     emitter.emit('layout')
//   //   })
//   // })
// }

export default async function ({ router, store }: Params, ctx: any) {
  console.log('window.__VUE_APP__:', window.__VUE_APP__)
  console.log('store:', store)
  await request.get('http://127.0.0.1:3000/api/content/posts')
  return await layoutFetch(ctx, router)
}
