import { WrapFetch } from '@/core/fetch'
import { UserProps } from './config'

export default WrapFetch<UserProps>(async (ctx: any) => {
  return {
    props: {},
  }
})
