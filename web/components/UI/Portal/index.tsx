import React, { FC, useEffect, useRef, useState, ReactNode, ReactNodeArray } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  children: ReactNode | ReactNodeArray
  type?: string
}

export const Portal: FC<PortalProps> = ({ children, type = 'div' }) => {
  let mountNode = useRef<HTMLDivElement | null>(null)
  const portalNode = useRef<HTMLElement | null>(null)
  const [, forceUpdate] = useState<{}>()

  useEffect(() => {
    if (!mountNode.current) return
    const ownerDocument = mountNode.current!.ownerDocument
    portalNode.current = ownerDocument.createElement(type)!
    ownerDocument!.body.appendChild(portalNode.current)
    forceUpdate({})
    return () => {
      if (portalNode.current && portalNode.current.ownerDocument) {
        portalNode.current.ownerDocument.body.removeChild(portalNode.current)
      }
    }
  }, [type])

  return portalNode.current ? createPortal(children, portalNode.current) : <span ref={mountNode} />
}

export default Portal
