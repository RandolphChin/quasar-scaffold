<template>
  <div class="q-pa-xs bg-grey-1 text-black">
    <div class="q-gutter-xs">
      <q-chip clickable square removable v-for="(route, index) in historyRoutes" @click="navigateTo(route)" :key="index"  color="green-5" text-color="white" >
        {{ route.name }}
      </q-chip>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useHistoryStore } from 'src/stores/tagViewStore';
defineOptions({
  name: 'TagHistory'
})
const router = useRouter();
const historyRoutes = useHistoryStore().historyStack; // 获取 store 实例

const navigateTo = (route) => {
  router.push({ name: route.name }); // 导航到相应的路由
};
</script>

<style scoped>

</style>
