import type { CategoryProps } from '@/modules/category'
import React, { FC, useContext, useMemo } from 'react'

const Category: FC<CategoryProps> = () => {
  const { state } = useContext(window.STORE_CONTEXT)
  const data = useMemo(() => {
    return state.category || {}
  }, [state.category])

  return <div>{data.name}</div>
}

export default Category
