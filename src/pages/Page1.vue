<template>
  <q-page class="flex flex-center">
    <li v-for="(item, index) in items" :key="index">
      {{ parentMessage }} - {{ index }} - {{ item.message }}
    </li>
  </q-page>
</template>

<script setup>
import {ref} from "vue";

defineOptions({
  name: 'PageOne'
});
const parentMessage = ref('Parent')
const items = ref([{ message: ('Foo') }, { message: ('Bar') }])

</script>
