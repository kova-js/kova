import React, { FC, ReactNode, ReactNodeArray } from 'react'

interface ModalProps {
  children: ReactNode | ReactNodeArray
}
const Modal: FC<ModalProps> = (props) => {
  return <>{props.children}</>
}

export default Modal
