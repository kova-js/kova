import React, { FC, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactChild
}

const navigation = [
  { name: 'Articles', href: '/articles', current: false },
  { name: 'User', href: '/user/zack', current: false },
  { name: 'Tag', href: '/tag/test_001', current: false },
  { name: 'Category', href: '/category/test', current: false },
  { name: 'Article', href: '/article/test001', current: false },
]

const Layout: FC<LayoutProps> = (props) => {
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
    <div>
      {props.children}
    </div>
  )
}

export default Layout
