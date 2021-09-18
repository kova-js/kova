import React, { FC, useContext, useMemo } from 'react'

interface CategoryProps {
  title?: string
  data: any
}

const Category: FC<CategoryProps> = (props) => {
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
