<template>
  <div class="q-pa-md flex flex-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="username" label="Username" outlined />
        <q-input v-model="password" label="Password" type="password" outlined />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Login" color="primary" @click="handleLogin" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/authStore';
import { fakeBackend } from 'src/fakeBackend';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar();

const handleLogin = async () => {
  try {
    const response = await fakeBackend.login({
      username: username.value,
      password: password.value,
    });
    authStore.setToken(response.token);
    authStore.setUser(response.user);
    router.push('/');
  } catch (error) {
    console.log(error );
    console.log(error.message );
  }
};
</script>
