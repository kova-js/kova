import { WrapFetch } from '@/core/fetch'
import { RegisterProps } from './config'

export default WrapFetch<RegisterProps>(async (ctx: any) => {
  return {
    props: {},
  }
})
