import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyD_6dl0wYOBwzxHIwYnZlsP0IwlBLyocJA",
  authDomain: "vue-firebase-auth-geo-007.firebaseapp.com",
  databaseURL: "https://vue-firebase-auth-geo-007.firebaseio.com",
  projectId: "vue-firebase-auth-geo-007",
  storageBucket: "vue-firebase-auth-geo-007.appspot.com",
  messagingSenderId: "815664905503",
  appId: "1:815664905503:web:bf9b0fd3a145158868842a"
};
// Initialize Firebase
const firebaseApp= firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()