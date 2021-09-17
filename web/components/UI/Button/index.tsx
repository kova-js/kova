import React from 'react'
import { FC, ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
}
const Button: FC<ButtonProps> = (props) => {
  return <>{props.children}</>
}

export default Button
