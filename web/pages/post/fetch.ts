import { WrapFetch } from '@/core/fetch'
import type { PostProps } from '@/modules/post'

export default WrapFetch<PostProps>(async (ctx: any) => {
  console.log(ctx.match)
  // const data = __isBrowser__
  //   ? await (await window.fetch(`/api/posts/${ctx.match.params.slug}`)).json()
  //   : ctx.pageProps
  return {
    post: {
      data: {},
    },
    props: {},
  }
})
