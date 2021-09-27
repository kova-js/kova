import React, { useEffect, useRef, useState } from 'react'
import type { FC, ReactNode, ReactNodeArray } from 'react'

import { createPortal } from 'react-dom'

type PortalProps = {
  children: ReactNode | ReactNodeArray
  type?: string
}

export const Portal: FC<PortalProps> = ({ children, type = 'div' }) => {
  const mountNode = useRef<HTMLDivElement | null>(null)
  const portalNode = useRef<HTMLElement | null>(null)
  const [, forceUpdate] = useState<Record<string, unknown>>()

  useEffect(() => {
    if (mountNode?.current) {
      const ownerDocument = mountNode.current.ownerDocument
      portalNode.current = ownerDocument.createElement(type)!
      ownerDocument!.body.appendChild(portalNode.current)

      forceUpdate({})
    }

    return () => {
      if (portalNode.current && portalNode.current.ownerDocument) {
        portalNode.current.ownerDocument.body.removeChild(portalNode.current)
      }
    }
  }, [type])

  return portalNode.current ? createPortal(children, portalNode.current) : <span ref={mountNode} />
}

export default Portal
