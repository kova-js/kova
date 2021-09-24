import { WrapFetch } from '@/core/fetch'
import type { PostsProps } from '@/modules/post'

export default WrapFetch<PostsProps>(async (ctx: any) => {
  const data = __isBrowser__ ? await (await window.fetch(`/api/posts`)).json() : ctx.pageProps
  return {
    post: {
      data: data,
    },
    props: {},
  }
})
