<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated >
      <q-toolbar class="bg-grey-1 text-black">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      <!-- 面包屑区域 -->
        <q-breadcrumbs>
          <q-breadcrumbs-el
            v-for="(breadcrumb, index) in breadcrumbStore.breadcrumbs"
            :key="index"
            :label="breadcrumb.title"
            @click="navigateTo(breadcrumb.path)"
          />
        </q-breadcrumbs>

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>

      <!-- 选项卡区域 -->
<!--
      <q-tabs v-model="activeTab" @input="tabChange">
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
      -->
      <q-tabs>
        <q-route-tab
          v-for="(tab) in breadcrumbStore.tabs"
          :to="tab.path"
          :label="tab.title"
          :key="tab.path"
          @contextmenu.prevent="showTabContextMenu($event, index)"
        />
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
          :addBreadcrumb="addBreadcrumb"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { mockRoutes } from '../mock'; // 引入 mockRoutes
import { useBreadcrumbStore } from '../stores/tagViewStore';
import { useRouter } from 'vue-router';

const router = useRouter();
defineOptions({
  name: 'MainLayout'
})
const breadcrumbStore = useBreadcrumbStore();
// 生成动态菜单项
const linksList = mockRoutes;
const leftDrawerOpen = ref(false)
const activeTab = ref(0); // 当前激活的选项卡
// 切换左侧抽屉
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// 添加面包屑的函数
/*

function addBreadcrumb(rou) {
  console.log(router.currentRoute.value.path); // 当前路由的路径
  console.log(router.currentRoute.value.matched);
  const parentRoute = router.currentRoute.value.matched[router.currentRoute.value.matched.length - 1]; // 获取父级路由

  debugger
  if (parentRoute) {
    console.log('.....');
    console.log(parentRoute.path); // 父级路由的路径
  }
  breadcrumbStore.clearBreadcrumbs()
  if(rou.children) {
    if (rou.children.length == 0) {
      breadcrumbStore.addBreadcrumb(rou.meta.title, rou.path);
      addTab(rou);
    }
  }
}
*/
function addBreadcrumb(rou) {
  // 计算属性，获取当前路由的父级
  const arr = findParentRoutesByName(rou.name)
  const allParentRoute = [rou, ...arr]
  breadcrumbStore.clearBreadcrumbs()
    // 按照索引倒序遍历 fullRoute
    for (let i = allParentRoute.length - 1; i >= 0; i--) {
      const route = allParentRoute[i];
      debugger
      breadcrumbStore.addBreadcrumb(route.meta.title, route.path);
    }
}
// 添加选项卡的函数
function addTab(link) {
  const existingTab = breadcrumbStore.tabs.find(tab => tab.path === link.path);
  if (!existingTab) {
    breadcrumbStore.addTab({ title: link.meta.title, path: link.path });
  }
}

// 切换选项卡
function tabChange(index) {
  activeTab.value = index;
  router.push(breadcrumbStore.tabs[index].path);  // 跳转到对应的路由
}

// 关闭选项卡的函数
function closeTab(index) {
  breadcrumbStore.removeTab(index);
  if (activeTab.value === index) {
    activeTab.value = Math.max(0, index - 1);  // 更新激活选项卡的索引
    router.push(breadcrumbStore.tabs[activeTab.value].path); // 切换路由
  }
}

// 路由变化时更新面包屑
watch(() => router.currentRoute.value, (to) => {
  if (to.meta.title) {
    addBreadcrumb(to);
  }
});

// 路由跳转
function navigateTo(path) {
  router.push(path);
}

// 右键菜单显示选项
function showTabContextMenu(event, index) {
  // 创建上下文菜单
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

  function closeMenu() {
    document.body.removeChild(menu);
    document.removeEventListener('click', closeMenu);
  }
  document.addEventListener('click', closeMenu);
}

function refreshTab(index) {
  // 刷新选项卡的逻辑
}

// 递归查找所有父路由
function findParentRoutesByName(targetName) {
  const allRoutes = router.getRoutes();
  const parentRoutes = [];

  function findParents(routes, parents) {
    for (const route of routes) {
      // 如果当前路由的 children 中包含目标路由，则将当前路由加入父路由列表
      if (route.children.some(child => child.name === targetName)) {
        parents.push(route);
        // 继续递归检查当前路由的 children
        findParents(route.children, parents);
      } else if (route.children.length > 0) {
        // 当前路由的 children 中不包含目标路由，继续递归检查 children
        findParents(route.children, parents);
      }
    }
  }

  findParents(allRoutes, parentRoutes);

  return parentRoutes;
}
</script>
