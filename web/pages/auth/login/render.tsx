import type { LoginProps } from '@/modules/auth'
import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

const Login: FC<LoginProps> = () => {
  return (
    <div>
      <NavLink to="/admin">Admin</NavLink>
    </div>
  )
}

export default Login
