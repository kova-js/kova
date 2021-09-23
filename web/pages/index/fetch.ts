import { WrapFetch } from '@/core/fetch'
import { HomeProps } from './config'
import { matchPath } from 'react-router'

export default WrapFetch<HomeProps>(async (ctx: any) => {
  const match = matchPath('/', { path: '/' })
  console.log(match)
  return {
    home: {
      posts: ctx.pageProps,
    },
  }
})
