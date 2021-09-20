import { WrapFetch } from '@/core/fetch'
import { HomeProps } from './config'

export default WrapFetch<HomeProps>(async (ctx: any) => {
  return {
    home: {
      posts: ctx.pageProps
    },
  }
})
