import { FC, ReactNode, ReactNodeArray, useMemo } from 'react'
import React from 'react'
import './style.less'

export type ContainerProps = {
  children: ReactNode | ReactNodeArray
  top?: string | number
}

const Container: FC<ContainerProps> = (props) => {
  const paddingStyles = useMemo(() => {
    const { top } = props
    if (top) {
      return { paddingTop: typeof top === 'number' ? `${top}px` : top }
    }
    return {}
  }, [props.top])
  return (
    <div className="container" {...{ style: paddingStyles }}>
      {props.children}
    </div>
  )
}

export default Container
