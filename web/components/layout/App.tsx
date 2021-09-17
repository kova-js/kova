import { ConfigProvider } from 'antd'
import React, { FC } from 'react'
import { LayoutProps } from 'ssr-types-react'
import zhCN from 'antd/lib/locale/zh_CN'

const App: FC<LayoutProps> = (props) => {
  return (
    <ConfigProvider locale={zhCN} autoInsertSpaceInButton={false}>
      {props.children}
    </ConfigProvider>
  )
}

export default App
