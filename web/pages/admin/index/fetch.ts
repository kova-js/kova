import { WrapFetch } from '@/core/fetch'

export default WrapFetch<any>(async (ctx: any) => {
  return {
    admin: {
      posts: {},
    },
    meta: {
      title: '仪表盘',
    },
    props: {},
  }
})
