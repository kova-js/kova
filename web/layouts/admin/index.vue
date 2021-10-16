<template>
  <ALayout style="min-height: 100vh">
    <ALayoutSider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :theme="theme"
      class="sider"
    >
      <div class="logo">Kova <SearchOutlined /></div>
      <AMenu v-model:selectedKeys="selectedKeys" mode="inline" :theme="theme">
        <AMenuItem key="/admin">
          <DashboardOutlined />
          <span><router-link class="link" to="/admin">Dashboard</router-link></span>
        </AMenuItem>
        <AMenuItem key="/admin/site">
          <LayoutOutlined />
          <span><router-link class="link" to="/admin/site">View Site</router-link></span>
        </AMenuItem>
        <AMenuItem key="/admin/user">
          <UserOutlined />
          <span><router-link class="link" to="/admin/user">User</router-link></span>
        </AMenuItem>
        <AMenuItem key="/admin/posts">
          <FormOutlined />
          <span><router-link class="link" to="/admin/posts">Posts</router-link></span>
        </AMenuItem>
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
      <ALayoutContent style="margin: 16px">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div class="main">
          <slot />
        </div>
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Layout, Menu } from 'ant-design-vue'
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
  SearchOutlined,
} from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
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
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ALayoutSider: Layout.Sider,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ASubMenu: Menu.SubMenu,
  },
  setup(props) {
    const router = useRouter()
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
  // background: rgba(255, 255, 255, 0.3);
  // color: #fff;
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.link {
  // color: rgba(255, 255, 255, 0.65);
  margin-left: 10px;
}
.main {
  padding: 24px;
  background: #fff;
  min-height: calc(100vh - 100px);
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
