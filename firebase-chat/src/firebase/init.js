import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyIdEWHsDTsFmJHpdEeHrNZDVWoKRyJ4Q",
  authDomain: "vue-firebase-chat-007.firebaseapp.com",
  databaseURL: "https://vue-firebase-chat-007.firebaseio.com",
  projectId: "vue-firebase-chat-007",
  storageBucket: "vue-firebase-chat-007.appspot.com",
  messagingSenderId: "950720634464",
  appId: "1:950720634464:web:2e854c4dcc72d7eb53ad05"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore()
