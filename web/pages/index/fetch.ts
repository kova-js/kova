import { WrapFetch } from '@/core/fetch'
import { HomeProps } from './config'
import { matchPath } from 'react-router'
import axios from 'axios'

export default WrapFetch<HomeProps>(async (ctx: any) => {
  const match = matchPath('/', { path: '/' })
  console.log(match)
  const data = __isBrowser__ ? (await axios.get('/api/posts')).data : ctx.pageProps
  return {
    home: {
      posts: data,
    },
    props: {},
  }
})
