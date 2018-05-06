import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBZueQL6qZrqqTzmzXGfwCLiC7cgSOD71M",
  authDomain: "hacktiv8-phase3.firebaseapp.com",
  databaseURL: "https://hacktiv8-phase3.firebaseio.com",
  projectId: "hacktiv8-phase3",
  storageBucket: "hacktiv8-phase3.appspot.com",
  messagingSenderId: "924174146595"
}
firebase.initializeApp(config)

export const db = firebase.database()