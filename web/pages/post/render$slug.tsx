import React, { FC, useContext, useMemo } from 'react'

interface PostProps {
  title?: string
  data: any
}

const Post: FC<PostProps> = (props) => {
  const { state } = useContext(window.STORE_CONTEXT)
  const data = useMemo(() => {
    return state.post || {}
  }, [state.post])

  return <div>{data.name}</div>
}

// ;(Index as any).getLayout = (page: any) => <div>{page}</div>

export default Post
