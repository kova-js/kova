import { WrapFetch } from '@/core/fetch'

export default WrapFetch(async () => {
  return {
    meta: {
      title: '文章管理',
    },
    props: {},
  }
})
