import { WrapFetch } from '@/core/fetch'
import { TagsProps } from './config'

export default WrapFetch<TagsProps>(async (ctx: any) => {
  return {
    props: {},
  }
})
