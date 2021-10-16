<template>
  <ALayout style="min-height: 100vh">
    <ALayoutSider v-model:collapsed="collapsed" collapsible>
      <div class="logo">Kova</div>
      <AMenu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <AMenuItem key="1">
          <PieChartOutlined />
          <router-link class="link" to="/admin">Dashboard</router-link>
        </AMenuItem>
        <AMenuItem key="2">
          <DesktopOutlined />
          <router-link class="link" to="/admin/site">View Site</router-link>
        </AMenuItem>
        <AMenuItem key="sub1">
          <UserOutlined />
          <router-link class="link" to="/admin/user">User</router-link>
        </AMenuItem>
        <!-- <ASubMenu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <AMenuItem key="6">Team 1</AMenuItem>
          <AMenuItem key="8">Team 2</AMenuItem>
        </ASubMenu> -->
        <AMenuItem key="9">
          <FileOutlined />
          <span>File</span>
        </AMenuItem>
      </AMenu>
    </ALayoutSider>
    <ALayout>
      <ALayoutHeader style="background: #fff; padding: 0" />
      <ALayoutContent style="margin: 16px">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div class="main">
          <slot />
        </div>
      </ALayoutContent>
      <ALayoutFooter style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </ALayoutFooter>
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
  DesktopOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  FileOutlined,
} from '@ant-design/icons-vue'
export default defineComponent({
  name: 'AdminLayout',
  components: {
    PieChartOutlined,
    UserOutlined,
    DesktopOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    TeamOutlined,
    FileOutlined,
    ALayout: Layout,
    ALayoutFooter: Layout.Footer,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ALayoutSider: Layout.Sider,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ASubMenu: Menu.SubMenu,
  },
  setup(props) {
    return {
      selectedKeys: ref<string[]>(['1']),
      collapsed: ref<boolean>(false),
    }
  },
})
</script>

<style lang="less" scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
.link {
  color: rgba(255, 255, 255, 0.65);
  margin-left: 10px;
}
.main {
  padding: 24px;
  background: #fff;
  min-height: calc(100vh - 180px);
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
