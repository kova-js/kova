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
  console.log(props.ctx)
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
    // console.log(match)
    // const match = state?.route?.match
    console.log('match', match)
    if (match) {
      if (match.includes('admin')) {
        return AdminLayout
      } else if (match.includes('auth')) {
        return AuthLayout
      }
    }
    return BlogLayout
  }, [state?.route?.match])

  // useEffect(() => {
  //   const match = path
  //   console.log('match', match)
  //   let layout = BlogLayout
  //   console.log(layout)
  //   if (match) {
  //     if (match.includes('admin')) {
  //       layout = AdminLayout
  //     } else if (match.includes('auth')) {
  //       layout = AuthLayout
  //     }
  //   }
  //   setLayout(layout)
  //   // return BlogLayout
  // }, [state?.route?.match])

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
