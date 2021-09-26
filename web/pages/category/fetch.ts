import { WrapFetch } from '@/core/fetch'
import type { CategoryProps } from '@/modules/category'

export default WrapFetch<CategoryProps>(async (ctx: any) => {
  return {
    home: {
      posts: ctx.pageProps,
    },
    props: {},
  }
})
