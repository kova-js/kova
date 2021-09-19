import PostItem from '@/components/post/item'
import Container from '@/components/UI/Container'
import useTheme from '@/hooks/theme'
import Magazine from '@/layouts/Magazine'
import { Button, Col, Row } from 'antd'
import React, { FC } from 'react'

interface IndexProps {
  title?: string
}

const Index: FC<IndexProps> = (props) => {
  const { setTheme } = useTheme()

  return (
    <>
      <Magazine />
      <Button
        onClick={() => {
          setTheme({ mode: 'dark' })
        }}
      >
        测试
      </Button>
      <Container>
        <Row>
          <Col span={6}><PostItem /></Col>
        </Row>
      </Container>

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
    </>
  )
}

export default Index
