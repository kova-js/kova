import type { TagProps } from '@/modules/tag'
import React, { FC, useContext, useMemo } from 'react'

const Tag: FC<TagProps> = (props) => {
  const { state } = useContext(window.STORE_CONTEXT)
  const data = useMemo(() => {
    return state.tag || {}
  }, [state.tag])

  return <div>{data.name}</div>
}

export default Tag
