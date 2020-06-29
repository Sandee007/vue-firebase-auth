<template>
  <div class="chat container ">
    
    <h2 class="teal-text">Vue-Firebase Chat</h2> <!-- name is passed as prop -->
    <div class="images">
      <img src="../assets/logo.png" class="vue" > 
    <img src="../assets/firebase.png" alt="firebase" class="firebase">
    </div>
    <div class="card">
      <div class="card-content">
        <ul class="messages" v-chat-scroll>
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text"> {{message.name}} </span>
            <span class="grey-text text-darken-3"> {{message.content}} </span>
            <span class="grey-text time"> {{message.timestamp}} </span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <NewMessage :name="name" />
     </div>
    </div>
  </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'
import moment from 'moment'


export default {
  name: 'Chat',
  props: ['name'],
  components: {
    NewMessage
  },
  data(){
    return{
      messages: []
    }
  },
  created(){
    let ref = db.collection('messages').orderBy('timestamp');

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach( change =>{
        if(change.type == 'added'){
          let doc = change.doc; 
          this.messages.push( {
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('lll')
          })
        }
      })
    })
  }
  
}
</script>

<style>
.chat{
  margin-top: 20px;
}
.chat .images{
  text-align: center;
}
.chat .vue, .firebase{
  display:block;
  margin: 0 auto;
  max-width: 70px;
}
.chat .firebase{
  margin-top: -30px;
  max-width: 30px;
}

.chat h2{
  margin-top: 0px;
  font-size: 2.6em;
  text-align: center;
}
.chat li span{
  font-size: 1.4em;
}
.chat .time{
  display: block;
  font-size: .8em;
}
.messages{
  max-height: 300px;
  overflow: auto;
}
.messages::-webkit-scrollbar{
  width: 3px;
}
.messages::-webkit-scrollbar-track{
  background: #ddd;
}
.messages::-webkit-scrollbar-thumb{
  background: #aaa;
}

</style>