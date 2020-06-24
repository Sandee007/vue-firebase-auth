<template>
  <div class="index container">
    <div class="card" v-for="computer in computers" :key="computer.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteComputer(computer.id)" >delete</i>
        <h2 class="indigo-text"> {{computer.title}} </h2>
        <ul class="specs"> <!-- returns an array -->
          <li v-for="(spec, index) in computer.specs" :key="index" >
            <span class="chip"> {{spec}} </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data(){
    return{
        computers:[
          {id:1, title:'Desktop', specs :['dell','core-i3', '4GB RAM', '1TB HDD']},
          {id:2, title:'Laptop',  specs :['hp','core-i5', '8GB RAM', '1TB HDD']}
    ]
    }
  },
  methods:{
    deleteComputer(id){
      this.computers = this.computers.filter( computer => {
        return computer.id != id
      })
    }
  }
}
</script>

<style>
.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
}
.index .specs{
  margin: 30px auto;
}
.index .specs li{
  display: inline-block;
}
.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>