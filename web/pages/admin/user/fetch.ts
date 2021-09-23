import { WrapFetch } from '@/core/fetch'
import { UserProps } from './config'

export default WrapFetch<UserProps>(async (ctx: any) => {
  const data = __isBrowser__
    ? await (await window.fetch(`/api/users/${ctx.match.params.slug}`)).json()
    : await ctx.pageProps

  return {
    users: {
      posts: data,
    },
    props: {},
  }
})
