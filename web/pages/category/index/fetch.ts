import { WrapFetch } from '@/core/fetch'
import type { CategoriesProps } from '@/modules/category'

export default WrapFetch<CategoriesProps>(async (ctx: any) => {
  return {
    home: {
      posts: ctx.pageProps,
    },
    props: {},
  }
})
