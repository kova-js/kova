import Container from '@/components/UI/Container'
import { Col, Row } from 'antd'
import React, { FC } from 'react'
import './magazine.less'

interface MagazineProps {
  //   title?: string
}

const Magazine: FC<MagazineProps> = (props) => {
  //   const { setTheme } = useTheme()

  return (
    <div className="magazine">
      <div className="magazine-bg" />
      <Container>
      <Row gutter={8}>
          <Col span={12}>
            <div className="magazine-item">
              <div className="magazine-media">
                <div className="magazine-media-content"></div>
              </div>
              <a href="#" target="_blank" className="list-goto"></a>
            </div>
          </Col>
          <Col span={12}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <div className="magazine-item">
                  <div className="magazine-media">
                    <div className="magazine-media-content"></div>
                  </div>
                  <a href="#" target="_blank" className="list-goto"></a>
                </div>
              </Col>
              <Col span={12}>
                <div className="magazine-item">
                  <div className="magazine-media">
                    <div className="magazine-media-content"></div>
                  </div>
                  <a href="#" target="_blank" className="list-goto"></a>
                </div>
              </Col>
              <Col span={12}>
                <div className="magazine-item">
                  <div className="magazine-media">
                    <div className="magazine-media-content"></div>
                  </div>
                  <a href="#" target="_blank" className="list-goto"></a>
                </div>
              </Col>
              <Col span={12}>
                <div className="magazine-item">
                  <div className="magazine-media">
                    <div className="magazine-media-content"></div>
                  </div>
                  <a href="#" target="_blank" className="list-goto"></a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Magazine
