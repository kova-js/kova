import { WrapFetch } from '@/core/fetch'
import type { UsersProps } from '@/modules/user'

export default WrapFetch<UsersProps>(async () => {
  return {
    props: {},
  }
})
