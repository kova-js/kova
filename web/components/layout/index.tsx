import React, { FC } from 'react'
import { LayoutProps } from 'ssr-types-react'
import App from './App'

const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  const { injectState } = props
  const { injectCss, injectScript } = props.staticList!

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <title>Serverless Side Render</title>
        {injectCss}
      </head>
      <body>
        <div id="app">
          <App {...props} />
        </div>
        {injectState}
        {injectScript}
      </body>
    </html>
  )
}

export default Layout
