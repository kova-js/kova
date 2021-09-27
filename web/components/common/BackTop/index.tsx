import React from 'react'
import { FC, ReactNode } from 'react'
import './style.less'

interface BackTopProps {
  children: ReactNode
}
const BackTop: FC<BackTopProps> = (props) => {
  return <div className="backtop">{props.children}</div>
}

export default BackTop
