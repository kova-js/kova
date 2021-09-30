import type { FC, ReactNode } from 'react'
import React from 'react'
import './style.less'

interface FooterProps {
  children: ReactNode
}
const Footer: FC<FooterProps> = (props) => {
  return <div className="footer">{props.children}</div>
}

export default Footer
