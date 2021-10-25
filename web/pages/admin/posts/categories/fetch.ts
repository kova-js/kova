import { WrapFetch } from '@/core/fetch'

export default WrapFetch(async () => {
  return {
    meta: {
      title: '分类目录',
    },
    props: {},
  }
})
