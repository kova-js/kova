import { WrapFetch } from '@/core/fetch'
import { PostProps } from './config'

export default WrapFetch<PostProps>(async (ctx: any) => {
  const data = __isBrowser__
    ? await (await window.fetch(`/api/posts/${ctx.match.params.slug}`)).json()
    : ctx.pageProps
  return {
    post: {
      data: data,
    },
    props: {},
  }
})
