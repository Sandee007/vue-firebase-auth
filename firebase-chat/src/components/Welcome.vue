<template>
  <div class="welcome container center-align">
 <div class="images">
      <img src="../assets/logo.png">
     <img src="../assets/firebase.png" alt="firebase" class="firebase">
 </div>
    <div class="card">
      <div class="card-content center-align">
        <h2 class="teal-text">Welcome</h2>

        <form @submit.prevent="enterChat">
          <label for="name">Enter you name:</label>
          <input type="text" name="name" v-model="name">
          <p v-if="feedback" class="red-text"> {{feedback}} </p>
          <button class="btn teal">Enter Chat</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data(){
    return{
      name: null,
      feedback: null
    }
  },
  methods: {
    enterChat(){
      if(this.name){
        this.$router.push( {name: 'Chat', params: {name: this.name} })
      }else{
        this.feedback = 'You cannot proceed without a chatroom name'
      }
    }
  }
}
</script>

<style>


.welcome{
  max-width: 500px;
}
.firebase{
  margin: 0 auto;
  max-width: 60px ;
  margin-top: -90px;
}
.firebase, .vue{
  display: block;
  max-width: 100px;
}
form label{
  font-size: 1em;
}
button{
  margin-top: 30px ;
}
</style>