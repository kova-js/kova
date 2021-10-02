import React, { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'

type DashboardProps = {
  title?: string
  data: any
}

const Dashboard: FC<DashboardProps> = (props) => {
  return (
    <div>
      <NavLink to="/auth/login">Login</NavLink>
    </div>
  )
}

export default Dashboard
