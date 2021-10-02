import type { FC, ReactNode, ReactNodeArray } from 'react'
import React from 'react'
import './style.less'

export type ContainerProps = {
  children: ReactNode | ReactNodeArray
}

const Container: FC<ContainerProps> = (props) => {
  return <div className="container">{props.children}</div>
}

export default Container
