<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signOut, updatePassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'

const router = useRouter()
const user = auth.currentUser
const oldPassword = ref('')
const newPassword = ref('')
const deletePassword = ref('')
const message = ref('')
const error = ref('')

const handleLogout = async () => {
  await signOut(auth)
  router.push('/login')
}

const reauthenticate = async (password) => {
  if (!user || !user.email) return false
  const credential = EmailAuthProvider.credential(user.email, password)
  try {
    await reauthenticateWithCredential(user, credential)
    return true
  } catch {
    return false
  }
}

const handleChangePassword = async () => {
  message.value = ''
  error.value = ''
  const ok = await reauthenticate(oldPassword.value)
  if (!ok) {
    error.value = 'Pogrešna lozinka.'
    return
  }
  try {
    await updatePassword(user, newPassword.value)
    message.value = 'Lozinka promijenjena. Molimo ponovno se prijavite.'
    await signOut(auth)
    router.push('/login')
  } catch (err) {
    error.value = 'Greška pri promjeni lozinke: ' + err.message
  }
}

const handleDeleteUser = async () => {
  message.value = ''
  error.value = ''
  const ok = await reauthenticate(deletePassword.value)
  if (!ok) {
    error.value = 'Pogrešna lozinka.'
    return
  }
  try {
    await deleteUser(user)
    message.value = 'Korisnik obrisan.'
    router.push('/login')
  } catch (err) {
    error.value = 'Greška pri brisanju korisnika: ' + err.message
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-6">
    <div>
      <h2 class="text-2xl font-bold mb-2">Dobrodošli</h2>
      <p class="text-gray-700">Email: {{ user?.email }}</p>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-2">Promjena lozinke</h3>
      <input v-model="oldPassword" type="password" placeholder="Trenutačna lozinka" class="w-full px-4 py-2 mb-3 border rounded" />
      <input v-model="newPassword" type="password" placeholder="Nova lozinka" class="w-full px-4 py-2 mb-3 border rounded" />
      <button @click="handleChangePassword" class="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition">
        Promijeni lozinku
      </button>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-2">Brisanje računa</h3>
      <input v-model="deletePassword" type="password" placeholder="Lozinka za potvrdu" class="w-full px-4 py-2 mb-3 border rounded" />
      <button @click="handleDeleteUser" class="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
        Obriši račun
      </button>
    </div>

    <button @click="handleLogout" class="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition">
      Odjava
    </button>

    <p v-if="message" class="text-green-600 text-center">{{ message }}</p>
    <p v-if="error" class="text-red-600 text-center">{{ error }}</p>
  </div>
</template>
