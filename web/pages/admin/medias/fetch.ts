import { WrapFetch } from '@/core/fetch'

export default WrapFetch(async () => {
  return {
    meta: {
      title: '标签管理',
    },
    props: {},
  }
})
