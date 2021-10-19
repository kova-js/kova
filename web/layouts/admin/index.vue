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
        <AMenuItem key="/admin">
          <DashboardOutlined />
          <span>
            <router-link class="link" to="/admin">Dashboard</router-link>
          </span>
        </AMenuItem>
        <AMenuItem key="/admin/site">
          <LayoutOutlined />
          <span>
            <router-link class="link" to="/admin/site">View Site</router-link>
          </span>
        </AMenuItem>
        <AMenuItem key="/admin/users">
          <UserOutlined />
          <span>
            <router-link class="link" to="/admin/users">User</router-link>
          </span>
        </AMenuItem>
        <AMenuItem key="/admin/posts">
          <FormOutlined />
          <span>
            <router-link class="link" to="/admin/posts">Posts</router-link>
          </span>
        </AMenuItem>
        <AMenuItem key="/admin/tags">
          <TagsOutlined />
          <span>
            <router-link class="link" to="/admin/tags">Tags</router-link>
          </span>
        </AMenuItem>
        <ASubMenu>
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>
            <span>系统</span>
          </template>
          <AMenuItemGroup title="/admin/system">
            <AMenuItem key="/admin/system/options">
              <span>
                <router-link class="link" to="/admin/system/options">博客设置</router-link>
              </span>
            </AMenuItem>
            <AMenuItem key="/admin/system/tools">
              <span>
                <router-link class="link" to="/admin/system/tools">小工具</router-link>
              </span>
            </AMenuItem>
            <AMenuItem key="/admin/system/about">
              <span>
                <router-link class="link" to="/admin/system/about">关于</router-link>
              </span>
            </AMenuItem>
          </AMenuItemGroup>
        </ASubMenu>
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

export default defineComponent({
  name: 'AdminLayout',
  components: {
    // icons
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
    // components
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
.main {
  padding: 24px;
  background: #fff;
  min-height: calc(100vh - 120px);
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}
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
