import { WrapFetch } from '@/core/fetch'
import type { LoginProps } from '@/modules/auth'

export default WrapFetch<LoginProps>(async () => {
  return {
    props: {},
  }
})
