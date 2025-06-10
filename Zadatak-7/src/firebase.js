import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBOTIRRA59MGbP-ugJgwq3GAJY9nGYda0k",
  authDomain: "zadatak-7.firebaseapp.com",
  projectId: "zadatak-7",
  storageBucket: "zadatak-7.firebasestorage.app",
  messagingSenderId: "725463004428",
  appId: "1:725463004428:web:7b1ec779c033398d5a0529"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
