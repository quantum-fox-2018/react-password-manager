import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBjNx5jKs1y3tYG6bYW_QpgrSjN83oo5js",
  authDomain: "passwordmanager-react.firebaseapp.com",
  databaseURL: "https://passwordmanager-react.firebaseio.com",
  projectId: "passwordmanager-react",
  storageBucket: "",
  messagingSenderId: "373305128186"
}
firebase.initializeApp(config)
export const db = firebase.database()
export const auth = firebase.auth()