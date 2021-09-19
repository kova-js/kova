import Container from '@/components/UI/Container'
import React, { FC, ReactNode, ReactNodeArray, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './index.less'

interface LayoutProps {
  children: ReactNode | ReactNodeArray
}

const navigation = [
  { name: 'Posts', href: '/posts', current: false },
  { name: 'User', href: '/user/zack', current: false },
  { name: 'Tag', href: '/tag/test_001', current: false },
  { name: 'Category', href: '/category/test', current: false },
  { name: 'Post', href: '/post/test001', current: false },
]

const AuthLayout: FC<LayoutProps> = (props) => {
  const location = useLocation()
  const [currentUrl, setCurrentUrl] = useState('')

  const menus = useMemo(() => {
    return navigation.map((item) => ({
      ...item,
      current: currentUrl === item.href,
    }))
  }, [currentUrl])

  useEffect(() => {
    setCurrentUrl(location.pathname)
  }, [])

  useEffect(() => {
    setCurrentUrl(location.pathname)
  }, [location])

  useEffect(() => {
    console.log(menus)
  }, [menus])

  return (
    <div
      className="auth-layout"
      style={{ backgroundImage: `url(${'/assets/images/login-bg.jpeg'})` }}
    >
      <div className="auth-layout-content">
        <Container>
          <div className="auth-form">{props.children}</div>
        </Container>
      </div>
      <footer className="auth-layout-footer">footer</footer>
    </div>
  )
}

export default AuthLayout
