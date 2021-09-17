import React, { ReactNodeArray } from 'react'
import { FC, ReactNode } from 'react'

interface NoSsrProps {
  defer?: boolean
  children?: ReactNode | ReactNodeArray
}

const NoSsr: FC<NoSsrProps> = (props) => {
  return <>{props.children}</>
}

export default NoSsr
