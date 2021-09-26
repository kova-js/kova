import Container from '@/components/UI/Container'
import { Col, Row } from 'antd'
import React, { FC, useMemo } from 'react'
import './style.less'

type MagazineProps = {
  data?: any[]
}

const Magazine: FC<MagazineProps> = (props) => {
  const firstItem = useMemo(() => {
    const item = (props.data || [])[0] || {
      url: '#',
    }
    return (
      <Col span={12}>
        <div className="magazine-item">
          <div className="magazine-media">
            <div className="magazine-media-content"></div>
          </div>
          <a href={item.url} target="_blank" className="magazine-item-link"></a>
        </div>
      </Col>
    )
  }, [props.data])

  const otherItems = useMemo(() => {
    const items = props.data || [{}, {}, {}, {}]
    return items.map((item) => (
      <Col span={12} key={item.id}>
        <div className="magazine-item">
          <div className="magazine-media">
            <div className="magazine-media-content"></div>
          </div>
          <a href="#" target="_blank" className="magazine-item-link"></a>
        </div>
      </Col>
    ))
  }, [props.data])

  return (
    <div className="magazine">
      <div className="magazine-bg" />
      <Container>
        <Row gutter={12}>
          {firstItem}
          <Col span={12}>
            <Row gutter={[12, 12]}>{otherItems}</Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Magazine
