import { WrapFetch } from '@/core/fetch'
import type { PostProps } from '@/modules/post'

export default WrapFetch<PostProps>(async () => {
  return {
    meta: {
      title: '编辑文章',
    },
    props: {},
  }
})
