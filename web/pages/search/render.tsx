import React, { FC, useContext, useMemo } from 'react'

interface SearchProps {
  title?: string
  data: any
}

const Search: FC<SearchProps> = (props) => {
  const { state } = useContext(window.STORE_CONTEXT)
  const data = useMemo(() => {
    return state.post || {}
  }, [state.post])

  return <div>{data.name}</div>
}

// ;(Index as any).getLayout = (page: any) => <div>{page}</div>

export default Search
