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
          backgroundImage: `url(${'https://kova-1259457142.cos.ap-beijing.myqcloud.com/login-bg.jpeg?imageMogr2/thumbnail/640x640/interlace/1'})`,
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
