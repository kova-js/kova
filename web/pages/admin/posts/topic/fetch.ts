import { WrapFetch } from '@/core/fetch'

export default WrapFetch(async () => {
  return {
    meta: {
      title: '专题',
    },
    props: {},
  }
})
