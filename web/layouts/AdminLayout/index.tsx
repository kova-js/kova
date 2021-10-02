import { useSafeState } from 'ahooks'
import React, { FC, ReactNode, ReactNodeArray, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

interface LayoutProps {
  children?: ReactNode | ReactNodeArray
}

const navigation = [
  { name: 'Posts', href: '/posts', current: false },
  { name: 'User', href: '/user/zack', current: false },
  { name: 'Tag', href: '/tag/test_001', current: false },
  { name: 'Category', href: '/category/test', current: false },
  { name: 'Post', href: '/post/test001', current: false },
]

const AdminLayout: FC<LayoutProps> = (props) => {
  // const location = useLocation()
  // const [currentUrl, setCurrentUrl] = useSafeState('')

  // const menus = useMemo(() => {
  //   return navigation.map((item) => ({
  //     ...item,
  //     current: currentUrl === item.href,
  //   }))
  // }, [currentUrl])

  // useEffect(() => {
  //   setCurrentUrl(location.pathname)
  // }, [])

  // useEffect(() => {
  //   setCurrentUrl(location.pathname)
  // }, [location])

  // useEffect(() => {
  //   console.log(menus)
  // }, [menus])

  return <div className="admin-layout">{props.children}</div>
}

export default AdminLayout
