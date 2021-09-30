import type { FC, ReactNode } from 'react'
import React from 'react'
import './style.less'

interface HeaderProps {
  children: ReactNode
}
const Header: FC<HeaderProps> = (props) => {
  return <div className="header">{props.children}</div>
}

export default Header
