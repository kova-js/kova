import { WrapFetch } from '@/core/fetch'
import type { PostProps } from '@/modules/post'

export default WrapFetch<PostProps>(async (ctx: any) => {
  // const data = __isBrowser__
  //   ? await (await window.fetch(`/api/posts/${ctx.match.params.slug}`)).json()
  //   : ctx.pageProps
  return {
    post: {
      data: {},
    },
    meta: {
      title: '用户管理',
    },
    props: {},
  }
})
