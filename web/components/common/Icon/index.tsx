import { createFromIconfontCN } from '@ant-design/icons'
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont'
import type { FC } from 'react'

const Icon: FC<IconFontProps> = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_2711045_3i2sxl38i6.js'],
})

export default Icon
