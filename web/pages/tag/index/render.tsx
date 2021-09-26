import type { TagsProps } from '@/modules/tag'
import React, { FC, useContext, useMemo } from 'react'

const Tags: FC<TagsProps> = () => {
  const { state } = useContext(window.STORE_CONTEXT)
  const tags: any[] = useMemo(() => {
    return state.tags || []
  }, [state.tags])

  return (
    <div>
      {tags.map((tag) => (
        <div key={tag.slug}>{tag.name}</div>
      ))}
    </div>
  )
}

export default Tags
