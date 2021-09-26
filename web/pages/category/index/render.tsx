import type { CategoriesProps } from '@/modules/category'
import React, { FC, useContext, useMemo } from 'react'

const Category: FC<CategoriesProps> = () => {
  const { state } = useContext(window.STORE_CONTEXT)
  const categories: any[] = useMemo(() => {
    return state.categories || []
  }, [state.categories])

  return (
    <div>
      {categories.map((category) => (
        <div key={category.slug}>{category.name}</div>
      ))}
    </div>
  )
}

export default Category
