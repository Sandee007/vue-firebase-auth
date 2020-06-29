<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center blue-text">Signup</h2>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password">
      </div>
      <div class="field">
        <label for="username">Username</label>
        <input type="text" name="username" v-model="username">
        <input type="text" name="uid" v-if="uid" v-model="uid" >
      </div>
      <p class="red-text center" v-if="feedback"> {{feedback}} </p>
      <!-- <p class="green-text center"  id="uid"  v-bind="uid"> {{uid}} </p> -->
      <div class="field center">
        <button class="btn blue" >Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'
import functions from 'firebase/functions'

export default {
  name:'Signup',
  data(){
    return{
      email: null,
      password: null,
      username: null,
      feedback: null,
      slug: null,
      // uid: null
    }
  },
  // props: ['username'],
  methods: {
    signup(){
      if(this.username && this.email && this.password){
        this.slug = slugify(this.username, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });

        // manual way
        // let ref = db.collection('users').doc(this.slug);

        // cloud function way 
        let checkUsername = firebase.functions().httpsCallable('checkUsername');
        checkUsername( {slug:this.slug})
        .then(result => {
          console.log(result)
        // })
        // ref.get().then(doc => {
          // if(doc.exists){
          if(!result.data.unique){
            this.feedback = 'Username already taken';
          }
          else{
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then( (cred) => {

              // ref.set({
                db.collection('users').doc(this.slug).set({
                 username: this.username,
                  geolocation: null,
                  user_id: cred.user.uid,
              })
            })
            .then(() => {
              this.$router.push({ name: 'GMap' })
            })
            .catch(err => {
              console.log(err);
              this.feedback = err.message
            })
            .catch(err => console.log(err))
            this.feedback = 'Username available';
          }
        })
        console.log(this.slug)
      }else{
        this.feedback = 'All the fields should be filled'
      }
    }
  }
}
</script>

<style>
.signup{
  max-width: 400px;
  margin-top: 60px;
}
.signup h2{
  font-size: 2.4em;
}
.signup .field{
  margin-bottom: 16px;
}
</style>