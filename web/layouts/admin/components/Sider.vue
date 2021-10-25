<template>
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
    <div style="flex: 1 1 0%; overflow: hidden auto">
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
    </div>
    <div class="sider-links"> </div>
  </ALayoutSider>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
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
import { rtrim } from '@/utils'
import { menus } from '@/config/admin'

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
    return {
      selectedKeys: computed<string[]>(() => [rtrim(router.currentRoute.value.path, '/')]),
      collapsed: ref<boolean>(false),
      theme: ref<'light' | 'dark'>('light'),
      menus,
    }
  },
})
</script>
