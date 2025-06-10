<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')

const store = useUserStore()
const router = useRouter()

function handleLogin() {
  error.value = ''
  const success = store.login(email.value, password.value)
  if (!success) {
    error.value = 'Neispravni podaci za prijavu.'
    return
  }
  router.push('/user')
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Prijava</h2>

    <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 mb-3 border rounded" />
    <input v-model="password" type="password" placeholder="Lozinka" class="w-full px-4 py-2 mb-3 border rounded" />

    <button @click="handleLogin" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ">
      Prijava
    </button>

    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>

    <RouterLink to="/signup" class="block mt-4 text-blue-600 hover:underline">
      Nemate račun? Registrirajte se
    </RouterLink>
  </div>
</template>
