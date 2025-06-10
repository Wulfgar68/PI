<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const router = useRouter()

const handleRegister = async () => {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = 'Lozinke se ne podudaraju.'
    return
  }
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    router.push('/user')
  } catch (err) {
    error.value = 'Registracija nije uspjela: ' + err.message
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Registracija</h2>

    <input v-model="email" type="email" placeholder="Email" class="w-full px-4 py-2 mb-3 border rounded" />
    <input v-model="password" type="password" placeholder="Lozinka" class="w-full px-4 py-2 mb-3 border rounded" />
    <input v-model="confirmPassword" type="password" placeholder="Ponovi lozinku" class="w-full px-4 py-2 mb-3 border rounded" />

    <button @click="handleRegister" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
      Registracija
    </button>

    <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>

    <RouterLink to="/login" class="block mt-4 text-blue-600 hover:underline">
      Već imate račun? Prijavite se
    </RouterLink>
  </div>
</template>
