import { WrapFetch } from '@/core/fetch'
import type { TagProps } from '@/modules/tag'

export default WrapFetch<TagProps>(async (ctx: any) => {
  return {
    props: {},
  }
})
