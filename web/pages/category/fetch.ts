import { WrapFetch } from '@/core/fetch'
import { CategoryProps } from './config'

export default WrapFetch<CategoryProps>(async (ctx: any) => {
  return {
    home: {
      posts: ctx.pageProps,
    },
    props: {}
  }
})
