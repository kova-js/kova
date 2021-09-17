import React from 'react'
import { FC, ReactNode } from 'react'
import './style.less'

interface ContainerProps {
  children: ReactNode
}
const Container: FC<ContainerProps> = (props) => {
  return <div className="container">{props.children}</div>
}

export default Container
