// import '@/global.css'
import { ThemeProvider } from '@/hooks/theme'
import Layout from '@/layouts'
import { useTitle } from 'react-use'
import axios from 'axios'
import React, { FC, useContext, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { LayoutProps } from 'ssr-types-react'
import Container from '@/components/UI/Container'
import { siteName } from './utils'

const App: FC<LayoutProps> = (props: LayoutProps) => {
  const location = useLocation()
  const { state } = useContext(window.STORE_CONTEXT)

  const title = useMemo(() => {
    if (state?.settings?.name && state?.meta?.title) {
      return siteName(state.meta.title, state.settings.name) || 'Kova'
    }
    return 'Kova'
  }, [state?.meta?.title, state?.settings?.name])

  useTitle(title)

  useEffect(() => {
    axios.post(`/api/log`, {})
  }, [location])

  return (
    <ThemeProvider>
      <Layout>
        <Container>{props.children}</Container>
      </Layout>
    </ThemeProvider>
  )
}

export default App
