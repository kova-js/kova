import { WrapFetch } from '@/core/fetch'
import { RegisterProps } from '@/modules/auth'

export default WrapFetch<RegisterProps>(async () => {
  return {
    props: {},
  }
})
