import type { FC } from 'react'
import React, { useEffect, useRef } from 'react'
import Vditor from 'vditor'
import 'vditor/dist/css/content-theme/ant-design.css'
import 'vditor/dist/index.css'

export type EditorProps = {
  options?: IOptions
}

const defaultOptions: IOptions = {
  cache: {
    enable: false,
  },
}

const Editor: FC<EditorProps> = (props) => {
  const editorRef = useRef<Vditor | null>(null)

  useEffect(() => {
    editorRef.current = new Vditor('editor', {
      ...defaultOptions,
      ...props.options,
    })
  }, [])

  return <div id="editor" />
}

export default Editor
