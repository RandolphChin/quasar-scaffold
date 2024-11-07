import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBreadcrumbStore = defineStore('breadcrumbStore', {
  state: () => ({
    breadcrumbs: [], // 面包屑数组
    tabs: [] // 选项卡数组
  }),

  getters: {
    getBreadcrumbs: (state) => state.breadcrumbs,
    getTabs: (state) => state.tabs,
  },

  actions: {
    addBreadcrumb(title, path) {
      this.breadcrumbs.push({ title, path });
    },

    removeBreadcrumb(index) {
      this.breadcrumbs.splice(index, 1);
    },

    clearBreadcrumbs() {
      this.breadcrumbs = [];
    },

    addTab(tab) {
      const existingTab = this.tabs.find(t => t.path === tab.path);
      if (!existingTab) {
        this.tabs.push(tab);
      }
    },

    removeTab(index) {
      this.tabs.splice(index, 1);
    },

    clearTabs() {
      this.tabs = [];
    },

    activateTab(index) {
      const activeTab = this.tabs[index];
      if (activeTab) {
        // 可以在这里切换到相应路由
        // router.push(activeTab.path);
      }
    },

    refreshTab(index) {
      console.log(`Refreshing tab at index ${index}`);
      // 刷新选项卡的逻辑
    }
  }
});
