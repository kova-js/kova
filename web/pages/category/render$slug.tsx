import React, { FC, useContext, useMemo } from 'react'

interface CategoryProps {
  title?: string
  data: any
}

const Category: FC<CategoryProps> = (props) => {
  const { state } = useContext(window.STORE_CONTEXT)
  const data = useMemo(() => {
    return state.category || {}
  }, [state.category])

  return <div>{data.name}</div>
}

// ;(Index as any).getLayout = (page: any) => <div>{page}</div>

export default Category
