import { useEnhancedEffect } from '@/hooks/useEnhancedEffect'
import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react'

export type NoSsrProps = {
  children: ReactNode
  defer?: boolean
  fallback?: ReactNode
  onMounted?: (mounted: boolean) => void
}

const NoSsr: FC<NoSsrProps> = (props) => {
  const { children, defer = false, fallback = null, onMounted } = props
  const [mountedState, setMountedState] = useState(false)

  useEnhancedEffect(() => {
    if (!defer) {
      setMountedState(true)
    }
  }, [defer])

  useEffect(() => {
    if (defer) {
      setMountedState(true)
    }
  }, [defer])

  useEffect(() => {
    if (onMounted) {
      onMounted(mountedState)
    }
  }, [mountedState, onMounted])

  return <Fragment>{mountedState ? children : fallback}</Fragment>
}

export default NoSsr
