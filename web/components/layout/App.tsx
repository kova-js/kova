import { ThemeProvider } from '@/hooks/theme'
import BlogLayout from '@/layouts'
// import AuthLayout from '@/layouts/AuthLayout'
import { useTitle } from 'react-use'
import React, { FC, useContext, useMemo } from 'react'
import { LayoutProps } from 'ssr-types-react'
import { siteName } from './utils'
import '@/common.less'

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

  useTitle(title)

  return (
    <ThemeProvider>
      <Layout>{props.children}</Layout>
    </ThemeProvider>
  )
}

export default App
