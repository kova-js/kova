import { WrapFetch } from '@/core/fetch'
import { TagProps } from './config'

export default WrapFetch<TagProps>(async (ctx: any) => {
  return {
    props: {},
  }
})
