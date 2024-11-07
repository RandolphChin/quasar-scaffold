<template>
  <div class="history-list">
    <h3>历史记录</h3>
    <q-list>
      <q-item
        v-for="(route, index) in historyRoutes"
        :key="index"
        @click="navigateTo(route)"
      >
        <q-item-section>
          <q-item-label>{{ route.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useHistoryStore } from 'src/stores/tagViewStore';
defineOptions({
  name: 'TagHistory'
})
const router = useRouter();
const historyRoutes = useHistoryStore().historyStack; // 获取 store 实例
console.log(historyRoutes)
console.log(historyRoutes.historyStack)
const navigateTo = (route) => {
  router.push({ name: route.name }); // 导航到相应的路由
};
</script>

<style scoped>
.history-list {
  padding: 1rem;
}
</style>
