export type MenuType = {
  path: string
  title: string
  icon?: string
  children?: undefined
}

export type SubMenuType = {
  path: string
  title: string
  icon?: string
  children: (MenuType | SubMenuType)[]
}

export const menus: (MenuType | SubMenuType)[] = [
  {
    path: '/admin',
    title: '仪表盘',
    icon: 'DashboardOutlined',
  },
  {
    path: '/admin/users',
    title: '用户管理',
    icon: 'FormOutlined',
    children: [
      {
        path: '/admin/users/profile',
        title: '个人资料',
      },
    ],
  },
  {
    path: '/admin/posts',
    title: '文章管理',
    icon: 'UserOutlined',
  },
  {
    path: '/admin/tags',
    title: '标签管理',
    icon: 'TagsOutlined',
  },
  {
    path: '/admin/system',
    title: '系统',
    icon: 'SettingOutlined',
    children: [
      {
        path: '/admin/system/options',
        title: '博客设置',
      },
      {
        path: '/admin/system/tools',
        title: '小工具',
      },
      {
        path: '/admin/system/about',
        title: '关于',
      },
    ],
  },
]
