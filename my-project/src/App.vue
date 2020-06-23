<template>
  <div id="app">
    <h1> {{title}} </h1>
    <img src="./assets/logo.png">
    <!-- <HelloWorld/> -->
    <Navbar/>
    <AllFriends :friends="friends" @delete="deleteFriend" /> <!-- sending props -->
    <OnlineFriends :friends="friends" />
    <Blogs/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Navbar from './components/Navbar';
// import AllFriends from './components/AllFriends';
// import OnlineFriends from './components/OnlineFriends';
import Blogs from './components/Blogs';

export default {
  name: 'App',
  components: {
    // HelloWorld
    Navbar,
    // AllFriends,
    // OnlineFriends
    Blogs
  },
  data(){
    return{
      title: 'My first Vue app :D',
       friends:[
          {name: 'Bruce' , online:true },
          {name: 'Clark' , online:false },
          {name: 'Peter' , online:true },
          {name: 'Tony' , online:false }
      ]
    }
  },
  methods :{
    deleteFriend(payload){
      console.log(payload);
      this.friends = this.friends.filter(friend => {
        return friend.name !== payload.name;
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>

</style>
