<template>
  <q-item
    clickable
    :to="path"
    @click="test"
    @click.stop="toggleChildren"
  >
  <q-item-section v-if="props.icon" avatar>
    <q-icon :name="props.icon" size="xs"/>
  </q-item-section>

  <q-item-section>
    <q-item-label>{{ props.title }}</q-item-label>
    <q-item-label caption>{{ props.caption }}</q-item-label>
  </q-item-section>
    <!-- 如果有子菜单, 显示箭头图标 -->
    <q-item-section v-if="children.length" side>
      <q-icon :name="isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_right'" />
    </q-item-section>
  </q-item>
<!--
  <q-list v-if="children && children.length" class="q-pl-md">
    <EssentialLink
      v-for="child in children"
      :key="child.name"
      :title="child.meta.title"
    :icon="child.icon"
    :path="`${path}/${child.path}`"
    :children="child.children"
    />
  </q-list>
  -->
  <!-- 子菜单区域 -->
  <q-list v-if="isOpen" class="q-pl-md"> <!-- 当 isOpen 为 true 时显示子菜单 -->
    <EssentialLink
      v-for="child in children"
      :key="child.name"
      :title="child.meta.title"
      :icon="child.icon"
      :path="`${path}/${child.path}`"
    :children="child.children"
    />
  </q-list>
</template>

<script setup>
import {computed, ref} from "vue";

defineOptions({
  name: 'EssentialLink'
})

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    default: ''
  },

  path: {
    type: String,
    default: '#'
  },

  icon: {
    type: String,
    default: ''
  },

  children: {
    type: Array,
    default: () => []
  }
})

// 1. 添加控制折叠状态的 ref
const isOpen = ref(false); // 用于跟踪子菜单是否展开

// 2. 切换子菜单的控制函数
function toggleChildren() {
  isOpen.value = !isOpen.value; // 切换折叠状态
}
function test(){
  console.log('test')
}
</script>
