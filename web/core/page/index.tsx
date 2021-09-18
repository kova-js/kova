import { useMeta, usePageState } from '@/hooks'
import React, { FC } from 'react'
import { SProps } from 'ssr-types-react'

interface WrapPageOptions {
  name: string
}

export interface PageProps<T = any> extends SProps {
  pageProps: T
  meta: any
  setPageProps: (ctx: any) => Promise<void>
}
export type KPage<P = {}> = FC<PageProps<P>>

export function WrapPage<T = {}>(WrappedComponent: KPage<T>, options: WrapPageOptions) {
  return function (props: any) {
    const [pageProps, setPageProps] = usePageState()
    const meta = useMeta()

    const newProps = {
      pageProps,
      meta,
      setPageProps,
    }
    return <WrappedComponent {...props} {...newProps} />
  }
}
