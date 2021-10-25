import { WrapFetch } from '@/core/fetch'
import type { PostProps } from '@/modules/post'

export default WrapFetch<PostProps>(async () => {
  return {
    post: {
      data: {},
    },
    props: {},
  }
})
