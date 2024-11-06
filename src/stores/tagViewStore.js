import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBreadcrumbStore = defineStore('breadcrumbStore', () => {
  const breadcrumbs = ref([]);
  const tabs = ref([]);

  function addBreadcrumb(title, path) {
    breadcrumbs.value.push({ title, path });
  }

  function removeBreadcrumb(index) {
    breadcrumbs.value.splice(index, 1);
  }

  function clearBreadcrumbs() {
    breadcrumbs.value = [];
  }

  function addTab(tab) {
    tabs.value.push(tab);
  }

  function removeTab(index) {
    tabs.value.splice(index, 1);
  }

  function clearTabs() {
    tabs.value = [];
  }

  function activateTab(index) {
    const activeTab = tabs.value[index];
    if (activeTab) {
      // 可以根据需求跳转到对应的路径
      // router.push(activeTab.path);
    }
  }

  function refreshTab(index) {
    // 刷新逻辑可以根据需求实现
  }

  return {
    breadcrumbs,
    tabs,
    addBreadcrumb,
    removeBreadcrumb,
    clearBreadcrumbs,
    addTab,
    removeTab,
    clearTabs,
    activateTab,
    refreshTab
  };
});
