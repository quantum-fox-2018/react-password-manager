import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBZPwuwhxqI5zmr6ZDfYawTC-FNAXEdFQA",
  authDomain: "react-manager-d89bd.firebaseapp.com",
  databaseURL: "https://react-manager-d89bd.firebaseio.com",
  projectId: "react-manager-d89bd",
  storageBucket: "react-manager-d89bd.appspot.com",
  messagingSenderId: "1052040631551"
}
firebase.initializeApp(config)

export const db = firebase.database()
