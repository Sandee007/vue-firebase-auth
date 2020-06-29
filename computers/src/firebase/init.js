import firebase from 'firebase'
import firestore from 'firebase/firestore'

// initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyDhjTJ-x7gR3rPMN4cLTCV8fPo1qsIAt8w",
  authDomain: "vue-firebase-7a4dc.firebaseapp.com",
  databaseURL: "https://vue-firebase-7a4dc.firebaseio.com",
  projectId: "vue-firebase-7a4dc",
  storageBucket: "vue-firebase-7a4dc.appspot.com",
  messagingSenderId: "733416536018",
  appId: "1:733416536018:web:5d99e9e4b06f9669633a0b"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

// export firebase database
export default firebaseApp.firestore()