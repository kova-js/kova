import React, { FC, useContext, useMemo } from 'react'

interface TagProps {
  title?: string
  data: any
}

const Tag: FC<TagProps> = (props) => {
  const { state } = useContext(window.STORE_CONTEXT)
  const data = useMemo(() => {
    return state.tag || {}
  }, [state.tag])

  return <div>{data.name}</div>
}

// ;(Index as any).getLayout = (page: any) => <div>{page}</div>

export default Tag
