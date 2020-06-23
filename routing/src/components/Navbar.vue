<template>
  <div class="nav">
    <ul>
      <li> <router-link to="/"> Home </router-link> </li> <!-- works as an anchor tag -->
      <li> <router-link :to="{ name:'About' }" > About </router-link> </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data(){
    return{

    }
  }
}
</script>

<style>
ul{
  list-style-type: none;
  padding: 0;
}
a{
  color: #42b983;
}
</style>