import PostItem from '@/components/post/item'
import Container from '@/components/common/Container'
import useTheme from '@/hooks/theme'
import Magazine from '@/components/common/Magazine'
import { Button, Col, Row } from 'antd'
import React, { FC, useContext, useMemo } from 'react'

interface IndexProps {
  title?: string
}

const Index: FC<IndexProps> = () => {
  const { setTheme } = useTheme()
  const { state } = useContext(window.STORE_CONTEXT)
  const posts = useMemo(() => {
    return (
      <Row>
        {(state.home?.posts || []).map((post: any) => (
          <Col span={6} key={post.id}>
            <PostItem data={post} />
          </Col>
        ))}
      </Row>
    )
  }, [state.home?.posts])

  return (
    <div>
      <Magazine />
      <Container top="2rem">{posts}</Container>

      {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 xs:grid-cols-2">
        <div style={{ height: '300px', backgroundColor: '#eee'}}>1</div>
        <div style={{ height: '300px' }}>1</div>
        <div style={{ height: '300px' }}>1</div>
        <div style={{ height: '300px' }}>1</div>
        <div style={{ height: '300px' }}>1</div>
        <div style={{ height: '300px' }}>1</div>
        <div style={{ height: '300px' }}>1</div>
        <div style={{ height: '300px' }}>1</div>
        <div style={{ height: '300px' }}>1</div>
        <div style={{ height: '300px' }}>1</div>
        <div style={{ height: '300px' }}>1</div>
      </div> */}
    </div>
  )
}

export default Index
