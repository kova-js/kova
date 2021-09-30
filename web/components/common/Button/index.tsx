import type { FC, ReactNode } from 'react'
import React from 'react'

interface ButtonProps {
  children: ReactNode
}
const Button: FC<ButtonProps> = (props) => {
  return <>{props.children}</>
}

export default Button
