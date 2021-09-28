import React, { FC, useEffect, useRef } from 'react'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import 'vditor/dist/css/content-theme/ant-design.css'

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