import { WrapFetch } from '@/core/fetch'

export default WrapFetch(async () => {
  return {
    meta: {
      title: '关于',
    },
    props: {},
  }
})
