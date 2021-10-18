// import { WrapFetch } from '@/core/fetch'
// import { UsersProps } from '@/modules/user'

// export default WrapFetch<UsersProps>(async (ctx: any) => {
//   const data = __isBrowser__
//     ? await (await window.fetch(`/api/users/${ctx.match.params.slug}`)).json()
//     : await ctx.pageProps

//   return {
//     users: {
//       posts: data,
//     },
//     props: {},
//   }
// })

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
    props: {},
  }
})
