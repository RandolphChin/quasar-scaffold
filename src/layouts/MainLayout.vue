<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
      <!-- 面包屑区域 -->
      <q-toolbar class="bg-grey-9 text-white">
        <q-breadcrumbs>
          <q-breadcrumb
            v-for="(breadcrumb, index) in breadcrumbStore.breadcrumbs"
            :key="index"
            :label="breadcrumb.title"
            @click="navigateTo(breadcrumb.path)"
          />
        </q-breadcrumbs>
      </q-toolbar>

      <!-- 选项卡区域 -->
      <q-tabs v-model="activeTab" @input="tabChange" class="bg-grey-9 text-white">
        <q-tab
          v-for="(tab, index) in breadcrumbStore.tabs"
          :key="tab.path"
          :name="index"
          :label="tab.title"
          @contextmenu.prevent="showTabContextMenu($event, index)"
        >
          <q-btn flat icon="close" @click.stop="closeTab(index)" />
        </q-tab>
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          :children="link.children"
          @click="addTab(link)"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { mockRoutes } from '../mock'; // 引入 mockRoutes
import { useBreadcrumbStore } from '../stores/tagViewStore';
/*import { useRouter } from 'vue-router';

const router = useRouter();*/
defineOptions({
  name: 'MainLayout'
})
const breadcrumbStore = useBreadcrumbStore();
// 生成动态菜单项
const linksList = mockRoutes;
const leftDrawerOpen = ref(false)
const activeTab = ref(0); // 当前激活的选项卡

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// 添加面包屑的函数
function addBreadcrumb(route) {
  breadcrumbStore.addBreadcrumb(route.meta.title, route.path);
}

// 添加选项卡的函数
function addTab(link) {
  debugger
  const existingTab = breadcrumbStore.tabs.find(tab => tab.path === link.path);
  if (!existingTab) {
    breadcrumbStore.addTab({ title: link.meta.title, path: link.path });
  }
}

// 切换选项卡
function tabChange(index) {
  activeTab.value = index;
  // 跳转到对应的路由
  // router.push(breadcrumbStore.tabs[index].path);
}

// 关闭选项卡的函数
function closeTab(index) {
  breadcrumbStore.removeTab(index);
  if (activeTab.value === index) {
    activeTab.value = Math.max(0, index - 1); // 更新激活选项卡的索引
  }
}

// 路由跳转
function navigateTo(path) {
  // router.push(path); // 使用 Vue Router 实现跳转
}

function showTabContextMenu(event, index) {
  const menu = document.createElement('div');
  menu.style.position = 'absolute';
  menu.style.left = `${event.pageX}px`;
  menu.style.top = `${event.pageY}px`;
  menu.style.border = '1px solid #ccc';
  menu.style.backgroundColor = '#fff';
  menu.innerHTML = `
    <div onclick="closeTab(${index})">Close Tab</div>
    <div onclick="refreshTab(${index})">Refresh Tab</div>
    <div onclick="clearTabs()">Close All Tabs</div>
  `;
  document.body.appendChild(menu);

  // Handle menu close
  function closeMenu() {
    document.body.removeChild(menu);
    document.removeEventListener('click', closeMenu);
  }
  document.addEventListener('click', closeMenu);
}

function refreshTab(index) {
  // 这里添加刷新选项卡的逻辑
}
</script>
