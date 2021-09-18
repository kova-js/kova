import React, { Suspense, useContext } from 'react'
import { SProps, IContext } from 'ssr-types-react'
// import Slider from '@/components/slider'
import Rectangle from '@/components/rectangle'
import Search from '@/components/search'
import { IData } from '@/interface'
import { Button } from 'antd'

export default (props: SProps) => {
  const { state } = useContext<IContext<IData>>(window.STORE_CONTEXT)
  return (
    <div>
      <Button>test</Button>
      <Search></Search>
    </div>
  )
}
