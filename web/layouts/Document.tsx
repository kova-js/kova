import React, { FC } from 'react'
import { LayoutProps as DocumentProps } from 'ssr-types-react'
import App from './App'

const Dcoument: FC<DocumentProps> = (props: DocumentProps) => {
  const { injectState } = props
  const { injectCss, injectScript } = props.staticList ?? {}

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover"
        />
        <meta name="theme-color" content="#000000" />
        <title>Kova</title>
        {injectCss}
      </head>
      <body>
        <div id="app">
          <App>{props.children}</App>
        </div>
        {injectState}
        {injectScript}
      </body>
    </html>
  )
}

export default Dcoument
