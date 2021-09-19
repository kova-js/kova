import { ThemeProvider } from '@/hooks/theme'
import Layout from '@/layouts'
import { useTitle } from 'react-use'
import React, { FC, useContext, useMemo } from 'react'
import { LayoutProps } from 'ssr-types-react'
import { siteName } from './utils'
import Header from '@/layouts/Header'

const App: FC<LayoutProps> = (props: LayoutProps) => {
  const { state } = useContext(window.STORE_CONTEXT)

  const title = useMemo(() => {
    if (state?.settings?.name && state?.meta?.title) {
      return siteName(state.meta.title, state.settings.name) || 'Kova'
    }
    return 'Kova'
  }, [state?.meta?.title, state?.settings?.name])

  useTitle(title)

  return (
    <ThemeProvider>
      <Layout>
        <Header menus={[]} />
        {props.children}
      </Layout>
    </ThemeProvider>
  )
}

export default App
