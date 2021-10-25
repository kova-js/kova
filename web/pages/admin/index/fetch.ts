import { WrapFetch } from '@/core/fetch'

export default WrapFetch<any>(async () => {
  return {
    meta: {
      title: '仪表盘',
    },
    props: {},
  }
})
