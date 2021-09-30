import type { FC, ReactNode } from 'react'
import React from 'react'
import './style.less'

export type ContainerProps = {
  children: ReactNode
}
const Container: FC<ContainerProps> = (props) => {
  return <div className="container">{props.children}</div>
}

export default Container
