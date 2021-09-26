import { WrapFetch } from '@/core/fetch'
import type { UserProps } from '@/modules/user'

export default WrapFetch<UserProps>(async () => {
  return {
    props: {},
  }
})
