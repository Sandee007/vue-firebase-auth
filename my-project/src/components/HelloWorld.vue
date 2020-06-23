<template>
  <div class="hello">
      <h1> {{title}} </h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'My first Vue app :D'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  color: #444;
  font-weight: normal;
  text-align: center;
}
</style>
