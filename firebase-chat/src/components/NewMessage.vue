<template>
  <div class="new-message">

    <form @submit.prevent="addMessage">
        <label for="new-message"> Enter New Message  :</label>
        <label class="name teal-text"> {{name}} </label>
      <input type="text" name="new-message" v-model="newMessage">
      <div class="center-align">
        <p class="red-text" v-if="feedback"> {{feedback}} </p>
        <button type="submit" class="btn ">Send</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'NewMessage',
  props: ['name'],
  data(){
    return{
      newMessage: null,
      feedback: null
    }
  },
  methods:{
    addMessage(){
     if(this.newMessage){
       db.collection('messages').add( {
         content: this.newMessage,
         name: this.name,
         timestamp: Date.now()
       })
       .catch(err => console.log(err))

          console.log(this.newMessage)
          this.newMessage = null; 
          this.feedback = null;
     }else{
       this.feedback = "Message cannot be empty"
     }
    }
  }
}
</script>

<style>
.name{
  position: absolute;
  right: 20px;
  font-weight: bold;
}
</style>