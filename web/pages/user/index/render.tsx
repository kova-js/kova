import React, { FC, useContext, useMemo } from 'react'
import type { UsersProps } from '@/modules/user'

const Users: FC<UsersProps> = (props) => {
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

export default Users
