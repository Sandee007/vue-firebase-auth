<template>
  <div class="navbar">
    <nav class="nav-extended  blue-grey darken-4">
      <div class="nav-content">
        <router-link :to=" {name:'Index'} ">
          <span class="nav-title"> Computers  </span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab">
          <router-link :to=" {name:'AddComputer'} ">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
 name : 'Navbar',
 data(){
   return {

   }
 }
}
</script>

<style>
.navbar nav{
  width: 100%;
  padding: 0 20px; /* top/bottom - left/right */
}
</style>