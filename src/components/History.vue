<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-tabs
        no-caps
        class="shadow-2"
      >
        <q-tab  v-for="(key, index) in historyRoutes"  :key="index" :to="key.path" exact replace @click="navTo(key.path)">
          <div class="row items-center no-wrap">
            <span class="q-mr-xs">{{ key.meta.title}}</span>
            <q-btn icon="close" @click.stop="closeTab(key)" flat size="8px" round/>
          </div>
        </q-tab>
      </q-tabs>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, nextTick} from 'vue';
import { useHistoryStore } from '../stores/tagViewStore';
import {useRouter, useRoute} from "vue-router";
const router = useRouter();
defineOptions({
  name: 'TagHistory'
})

// const route = useRoute();
const historyRoutes = computed(() => useHistoryStore().historyStack);

function navTo (path) {
  router.push({ path: path });
}
function closeTab (activeTab) {
  let newPath = '';
  const tabs = historyRoutes.value; // 修正：获取 historyRoutes 的值
  tabs.forEach((item, index) => {
    // 检查当前标签是否是关闭的标签
    if (activeTab.path === item.path) {
      // 检查下一个标签是否存在
      if (index + 1 < tabs.length) {
        newPath = tabs[index + 1].path; // 获取下一个标签的路径
      } else if (index - 1 >= 0) {
        newPath = tabs[index - 1].path; // 获取上一个标签的路径
      } else {
        // 如果没有其他标签，则不更新 newPath
        newPath = '';
      }

      // 这里删除关闭的标签，以更新历史记录
      useHistoryStore().removeRoute(item);
    }
  });

  // 在关闭标签后，如果有新的路径，则导航
  if (newPath) {
    router.push({ path: newPath });
  }
}
</script>

<style scoped>
.q-tabs {
  position: sticky;
  top: 0;
  z-index: 10; /* 确保 tabs 在上层 */
}

.q-popup-proxy {
  position: absolute;
  z-index: 100; /* 确保右键菜单在上层 */
}
</style>
