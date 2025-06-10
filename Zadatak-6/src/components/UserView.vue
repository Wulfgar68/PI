<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()

const oldPassword = ref('')
const newPassword = ref('')
const deletePassword = ref('')
const message = ref('')

function handleLogout() {
  store.logout()
  router.push('/login')
}

function handleChangePassword() {
  const success = store.changePassword(oldPassword.value, newPassword.value)
  if (success) {
    message.value = 'Lozinka promijenjena. Molimo ponovno se prijavite.'
    router.push('/login')
  } else {
    message.value = 'Pogrešna trenutačna lozinka.'
  }
}

function handleDeleteUser() {
  const success = store.deleteUser(deletePassword.value)
  if (success) {
    message.value = 'Korisnik obrisan.'
    router.push('/login')
  } else {
    message.value = 'Pogrešna lozinka za brisanje.'
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-6">
    <div>
      <h2 class="text-2xl font-bold mb-2">Dobrodošli, {{ store.currentUser?.username }}</h2>
      <p class="text-gray-700">Email: {{ store.currentUser?.email }}</p>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-2">Promjena lozinke</h3>
      <input v-model="oldPassword" type="password" placeholder="Trenutačna lozinka" class="w-full px-4 py-2 mb-3 border rounded" />
      <input v-model="newPassword" type="password" placeholder="Nova lozinka" class="w-full px-4 py-2 mb-3 border rounded" />
      <button @click="handleChangePassword" class="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 ">
        Promijeni lozinku
      </button>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-2">Brisanje računa</h3>
      <input v-model="deletePassword" type="password" placeholder="Lozinka za potvrdu" class="w-full px-4 py-2 mb-3 border rounded" />
      <button @click="handleDeleteUser" class="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 ">
        Obriši račun
      </button>
    </div>

    <button @click="handleLogout" class="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 ">
      Odjava
    </button>

    <p v-if="message" class="text-green-600 text-center">{{ message }}</p>
  </div>
</template>
