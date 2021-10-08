import '@/common.less'
import { ThemeProvider } from '@/hooks/theme'
import { siteName } from '@/utils'
import { useTitle } from 'ahooks'
import type { FC } from 'react'
import React, { useContext, useMemo, useState, useEffect } from 'react'
import type { LayoutProps } from 'ssr-types-react'
import AdminLayout from './AdminLayout'
import AuthLayout from './AuthLayout'
import BlogLayout from './BlogLayout'

const App: FC<LayoutProps> = (props: LayoutProps) => {
  const { state } = useContext(window.STORE_CONTEXT)
  const path = useMemo(() => (__isBrowser__ ? location.pathname : props.ctx?.request.path), [])
  // const [Layout, setLayout] = useState<any>(BlogLayout)

  const title = useMemo(() => {
    if (state?.settings?.name && state?.meta?.title) {
      return siteName(state.meta.title, state.settings.name) || 'Kova'
    }
    return 'Kova'
  }, [state?.meta?.title, state?.settings?.name])

  const Layout = useMemo(() => {
    const match = path
    if (match) {
      if (match.includes('admin')) {
        return AdminLayout
      } else if (match.includes('auth')) {
        return AuthLayout
      }
    }
    return BlogLayout
  }, [state?.route?.match])

  useTitle(title)

  return (
    <div>
      <ThemeProvider>
        <Layout>{props.children}</Layout>
      </ThemeProvider>
    </div>
  )
}

export default App
