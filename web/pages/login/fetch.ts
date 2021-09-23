import { WrapFetch } from '@/core/fetch'
import { LoginProps } from './config'

export default WrapFetch<LoginProps>(async (ctx: any) => {
  return {
    props: {},
  }
})
