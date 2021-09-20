import React, { useMemo } from 'react'
import { FC } from 'react'
import { Tag, Avatar } from 'antd'
import { EyeOutlined, CommentOutlined } from '@ant-design/icons'
import './item.less'
import { NavLink } from 'react-router-dom'

interface PostItemProps {
  data: any
}

function linkUrl(slug: string) {
  return `/post/${slug}`
}

function userLinkUrl(name: string) {
  return `/user/${name}`
}

const PostItem: FC<PostItemProps> = (props) => {
  const { data = {} } = props
  const { title, slug, cover, image, user = {} } = data

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
            <NavLink to={linkUrl(slug)} title={title} className="post-item-title">
              {title}
            </NavLink>
          </div>
        </div>
        <div className="post-item-meta">
          <NavLink to={userLinkUrl(user.name)} target="_blank" className="post-item-avatar">
            <Avatar
              size={24}
              alt=""
              src="https://cravatar.cn/avatar/db0a42e95e32035a8bb677ece1186533?s=24&amp;d=https%3A%2F%2Fcosy.demo.nicetheme.xyz%2Fwp-content%2Fuploads%2F2021%2F08%2F2021080111213873.png&amp;r=g"
            />
            <div className="post-item-avatar-name">suxing</div>
          </NavLink>
          <div className="flex-shrink-0">
            <span className="d-inline-block d-xl-inline-block ms-2 ms-xl-3">
              <EyeOutlined /> {data.browseCount || 0}
            </span>
            <span className="d-none d-xl-inline-block ms-2 ms-xl-3">
              <CommentOutlined /> {data.commentsCount || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
