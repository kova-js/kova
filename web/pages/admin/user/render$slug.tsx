import { UserProps } from '@/modules/user'
import React, { FC, useContext, useMemo } from 'react'

const User: FC<UserProps> = () => {
  const { state } = useContext(window.STORE_CONTEXT)
  const data = useMemo(() => {
    return state.user || {}
  }, [state.user])

  return <div>{data.name}</div>
}

export default User
