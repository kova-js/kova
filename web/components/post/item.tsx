import React from 'react'
import { FC, ReactNode } from 'react'
import { Tag } from 'antd'
import './item.less'

interface PostItemProps {}
const PostItem: FC<PostItemProps> = (props) => {
  return (
    <div className="post-item">
      <div
        className="post-item-cover"
        style={{
          backgroundImage: `url(${'https://cosy.demo.nicetheme.xyz/wp-content/uploads/2020/08/2020082618051678.jpg'})`,
        }}
      ></div>
      <div className="post-item-content">
        <div className="post-item-body">
          <div className="post-item-cate">
            <Tag>tt</Tag>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
