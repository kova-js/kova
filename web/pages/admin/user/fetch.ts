import { WrapFetch } from '@/core/fetch'
import { UsersProps } from '@/modules/user'

export default WrapFetch<UsersProps>(async (ctx: any) => {
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
