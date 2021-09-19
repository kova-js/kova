import React, { FC, useContext, useMemo } from 'react'

interface LoginProps {
  title?: string
  data: any
}

const Login: FC<LoginProps> = (props) => {
  const { state } = useContext(window.STORE_CONTEXT)
  const data = useMemo(() => {
    return state.post || {}
  }, [state.post])

  return <div>{data.name}</div>
}

export default Login
