import React from 'react'
import type { FC } from 'react'
import { Tag, Avatar } from 'antd'
import { EyeOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons'
import './item.less'
import { NavLink } from 'react-router-dom'

interface PostItemProps {
  data: any
}

function linkUrl(slug: string) {
  return `/post/${slug}`
}

function userLinkUrl(slug: string) {
  return `/user/${slug}`
}

function categoryLinkUrl(slug: string) {
  return `/category/${slug}`
}

const PostItem: FC<PostItemProps> = (props) => {
  const { data = {} } = props
  const { title, slug, cover, image, user = {}, category } = data

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
            <NavLink to={categoryLinkUrl(category.slug)} title={title}>
              <Tag>{category.name}</Tag>
            </NavLink>
            <NavLink to={linkUrl(slug)} title={title} className="post-item-title">
              {title}
            </NavLink>
          </div>
        </div>
        <div className="post-item-meta">
          <NavLink to={userLinkUrl(user.slug)} target="_blank" className="post-item-avatar">
            <Avatar icon={<UserOutlined />} size={24} alt="" src={user.avatar} />
            <div className="post-item-avatar-name">{user.name}</div>
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
