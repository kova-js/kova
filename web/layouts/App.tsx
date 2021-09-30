import '@/common.less'
import { ThemeProvider } from '@/hooks/theme'
import { siteName } from '@/utils'
import type { FC } from 'react'
import React, { useContext, useEffect, useMemo } from 'react'
import { useTitle } from 'react-use'
import type { LayoutProps } from 'ssr-types-react'
import Layout from './BlogLayout'

const App: FC<LayoutProps> = (props: LayoutProps) => {
  const { state } = useContext(window.STORE_CONTEXT)

  const title = useMemo(() => {
    if (state?.settings?.name && state?.meta?.title) {
      return siteName(state.meta.title, state.settings.name) || 'Kova'
    }
    return 'Kova'
  }, [state?.meta?.title, state?.settings?.name])

  // const Layout = useMemo(() => BlogLayout, [])

  // const getVisitorId = async () => {
  //   let uid = localStorage.getItem('uid')
  //   try {
  //     if (isDev || !__isBrowser__ || uid) return
  //     const { visitorId } = await (
  //       await FingerprintJS.load({ token: 'ccL9Rco6lN2QmXSsMHq6' })
  //     ).get()
  //     localStorage.setItem('uid', visitorId)
  //     uid = visitorId
  //   } catch (error) {
  //     //
  //   } finally {
  //     await axios.post('/api/log', { uid })
  //   }
  // }

  useEffect(() => {
    // getVisitorId()
  }, [])

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
