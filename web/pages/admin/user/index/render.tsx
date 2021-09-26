import { UsersProps } from '@/modules/user'
import React, { FC, useContext, useMemo } from 'react'

const Category: FC<UsersProps> = () => {
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

// ;(Index as any).getLayout = (page: any) => <div>{page}</div>

export default Category
