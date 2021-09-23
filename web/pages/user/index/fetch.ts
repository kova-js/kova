import { WrapFetch } from '@/core/fetch'
import { UsersProps } from './config'

export default WrapFetch<UsersProps>(async (ctx: any) => {
  return {
    props: {},
  }
})
