<template>
  <ALayout style="min-height: 100vh">
    <ALayoutSider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :theme="theme"
      class="sider"
    >
      <div class="logo">
        Kova
        <SearchOutlined />
      </div>
      <AMenu v-model:selectedKeys="selectedKeys" mode="inline" :theme="theme">
        <template v-for="menu in menus" :key="menu.path">
          <template v-if="menu.children">
            <ASubMenu :key="menu.path">
              <template #icon>
                <SettingOutlined />
              </template>
              <template #title>
                <span>{{ menu.title }}</span>
              </template>
              <template v-for="submenu in menu.children" :key="submenu.path">
                <AMenuItem :path="submenu.path">
                  <component v-if="submenu.icon" :is="submenu.icon" />
                  <span>
                    <router-link class="link" :to="submenu.path">{{ submenu.title }}</router-link>
                  </span>
                </AMenuItem>
              </template>
            </ASubMenu>
          </template>
          <template v-else>
            <AMenuItem :key="menu.path">
              <component v-if="menu.icon" :is="menu.icon" />
              <span>
                <router-link class="link" :to="menu.path">{{ menu.title }}</router-link>
              </span>
            </AMenuItem>
          </template>
        </template>
      </AMenu>
    </ALayoutSider>
    <ALayout>
      <ALayoutHeader style="background: #fff; padding: 0">
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </ALayoutHeader>
      <ALayoutContent class="layout">
        <ABreadcrumb style="margin: 16px 0">
          <ABreadcrumbItem>User</ABreadcrumbItem>
          <ABreadcrumbItem>Bill</ABreadcrumbItem>
        </ABreadcrumb>
        <div class="main">
          <slot />
        </div>
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Layout, Menu, Breadcrumb } from 'ant-design-vue'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  LayoutOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  FileOutlined,
  FormOutlined,
  TagsOutlined,
  SettingOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

interface MenuType {
  path: string
  title: string
  icon?: string
  children?: undefined
}

interface SubMenuType {
  path: string
  title: string
  icon?: string
  children: (MenuType | SubMenuType)[]
}

const menus: (MenuType | SubMenuType)[] = [
  {
    path: '/admin',
    title: '仪表盘',
    icon: 'DashboardOutlined',
  },
  {
    path: '/admin/site',
    title: 'View Site',
    icon: 'LayoutOutlined',
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

export default defineComponent({
  name: 'AdminLayout',
  components: {
    DashboardOutlined,
    UserOutlined,
    LayoutOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    TeamOutlined,
    FileOutlined,
    SearchOutlined,
    FormOutlined,
    TagsOutlined,
    SettingOutlined,
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ALayoutSider: Layout.Sider,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ASubMenu: Menu.SubMenu,
    AMenuItemGroup: Menu.MenuItemGroup,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
  },
  setup(props) {
    const router = useRouter()
    // const
    return {
      selectedKeys: ref<string[]>([router.currentRoute.value.path]),
      collapsed: ref<boolean>(false),
      theme: ref<'light' | 'dark'>('light'),
      menus,
    }
  },
})
</script>

<style lang="less" scoped>
.logo {
  height: 32px;
  margin: 16px;
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.layout {
  margin: 0 16px 16px 16px;
}
// .link {
// margin-left: 10px;
// }
// .main {
//   padding: 24px;
//   background: #fff;
//   min-height: calc(100vh - 120px);
//   position: relative;
//   flex-grow: 1;
//   display: flex;
//   flex-direction: column;
//   overflow-y: auto;
//   overflow-x: hidden;
// }
.sider {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
</style>

<style lang="less">
.table-page-search-wrapper {
  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-bottom: 20px;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }

      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
}
</style>
