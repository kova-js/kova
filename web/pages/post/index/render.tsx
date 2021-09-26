import type { PostsProps } from '@/modules/post'
import React, { FC, useContext, useMemo } from 'react'

const Category: FC<PostsProps> = () => {
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

export default Category
