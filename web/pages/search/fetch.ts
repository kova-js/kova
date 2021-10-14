import { WrapFetch } from '@/core/fetch'
import axios from 'axios'

export type SearchProps = {
  data?: any
}

export default WrapFetch<SearchProps>(async (ctx: any) => {
  // const match = matchPath('/', { path: '/' })
  // console.log(match)
  // console.log(ctx)
  const data = __isBrowser__ ? (await axios.get('/api/content/posts')).data : ctx.pageProps
  return {
    home: {
      posts: data,
    },
    props: {},
  }
})
