import React, { FC, useContext, useMemo } from 'react'

interface ArticleProps {
  title?: string
  data: any
}

const Article: FC<ArticleProps> = (props) => {
  const { state } = useContext(window.STORE_CONTEXT)
  const data = useMemo(() => {
    return state.article || {}
  }, [state.article])

  return <div>{data.name}</div>
}

// ;(Index as any).getLayout = (page: any) => <div>{page}</div>

export default Article
