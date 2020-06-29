<template>
  <div class="navbar">
    <nav class="blue darken-4">
      <div class="container">
        <router-link href="" class="brand-logo left"  :to="{name: 'GMap'}"> Geo App </router-link>
        <ul class="right">
          <li v-if="!user" > <router-link :to=" {name:'Signup'} "> Sign up</router-link> </li>
          <li v-if="!user" > <router-link  :to="{name: 'Login' }"> Log in </router-link> </li>
          <li v-if="username" > {{username}} </li>
          <li v-if="user" ><a @click="logout">Log out</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
  name: 'Navbar',
  data(){
    return{
      user: null,
      username: null
    }
  },
  methods:{
    logout(){
      firebase.auth().signOut()
      .then(() => {
        this.$router.push( {name:'Login'})
      })
    }
  },
  created(){
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.user = user

        // get user details from firestore (my work) - cuz getting email is easy with (user)
        let uid = firebase.auth().currentUser.uid

        db.collection('users').where('user_id', '==', uid).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.data().username)
            this.username = doc.data().username
          })
        })

      } else{
        this.user = null
        this.username = null
      }
    })
  }
}
</script>

<style>

</style>
