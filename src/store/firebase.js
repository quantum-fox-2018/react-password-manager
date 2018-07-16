import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyCJ0Hlgag0DOOKpxzUsGTaE4FAu0tIE_EE",
  authDomain: "react-password-manager-bef30.firebaseapp.com",
  databaseURL: "https://react-password-manager-bef30.firebaseio.com",
  projectId: "react-password-manager-bef30",
  storageBucket: "react-password-manager-bef30.appspot.com",
  messagingSenderId: "827996324966"
}
firebase.initializeApp(config)
export const Database = firebase.database()
export const User = firebase.auth()