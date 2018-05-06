import { initializeApp } from 'firebase'
// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyCw5sd51lbmHX7Ymk8vOJuVUOqjOyxz7uU",
  authDomain: "passmanager-5df93.firebaseapp.com",
  databaseURL: "https://passmanager-5df93.firebaseio.com",
  projectId: "passmanager-5df93",
  storageBucket: "",
  messagingSenderId: "638663620497"
})
const db = app.database()

export default db