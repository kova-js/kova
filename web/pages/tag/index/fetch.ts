import { WrapFetch } from '@/core/fetch'
import type { TagsProps } from '@/modules/tag'

export default WrapFetch<TagsProps>(async (ctx: any) => {
  return {
    props: ctx.pageProps,
  }
})
