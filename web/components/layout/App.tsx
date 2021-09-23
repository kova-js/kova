import { ThemeProvider } from '@/hooks/theme'
import BlogLayout from '@/layouts'
// import AuthLayout from '@/layouts/AuthLayout'
import { useTitle } from 'react-use'
import React, { FC, useContext, useEffect, useMemo } from 'react'
import { LayoutProps } from 'ssr-types-react'
import { siteName } from './utils'
import '@/common.less'
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

const App: FC<LayoutProps> = (props: LayoutProps) => {
  const { state } = useContext(window.STORE_CONTEXT)

  const title = useMemo(() => {
    if (state?.settings?.name && state?.meta?.title) {
      return siteName(state.meta.title, state.settings.name) || 'Kova'
    }
    return 'Kova'
  }, [state?.meta?.title, state?.settings?.name])

  const Layout = useMemo(() => {
    return BlogLayout
  }, [])

  const getVisitorId = async () => {
    // Initialize an agent at application startup.
    console.time('visitor_id')
    const fpPromise = FingerprintJS.load({ token: 'ccL9Rco6lN2QmXSsMHq6' })
    // Get the visitor identifier when you need it.
    const fp = await fpPromise
    const result = await fp.get()
    // This is the visitor identifier:
    const visitorId = result.visitorId
    console.log(visitorId)
    console.timeEnd('visitor_id')
  }

  useEffect(() => {
    getVisitorId()
  }, [])

  useTitle(title)

  return (
    <ThemeProvider>
      <Layout>{props.children}</Layout>
    </ThemeProvider>
  )
}

export default App
