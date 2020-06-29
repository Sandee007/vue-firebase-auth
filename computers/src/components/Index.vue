<template>
  <div class="index container">
    <div class="card" v-for="computer in computers" :key="computer.id">

      <div class="card-content">
        <i class="material-icons delete" @click="deleteComputer(computer.id)" >delete</i>
        <h2 class="blue-grey-text "> {{computer.title}} </h2>
        <ul class="specs"> <!-- returns an array -->
          <li v-for="(spec, index) in computer.specs" :key="index" >
            <span class="chip"> {{spec}} </span>
          </li>
        </ul>
      </div>

      <span class="btn-floating btn-large halfway-fab">
        <router-link :to=" {name:'EditComputer', params: {computer_slug: computer.slug} } ">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>

    </div>
  </div>
</template>

<script>
// import firestore as db
import db from '@/firebase/init'

export default {
  name: 'Index',
  data(){
    return{
        computers:[
          // {id:1, title:'Desktop', specs :['dell','core-i3', '4GB RAM', '1TB HDD']},
          // {id:2, title:'Laptop',  specs :['hp','core-i5', '8GB RAM', '1TB HDD']}
    ]
    }
  },
  methods:{
    deleteComputer(id){
      // delete doc from firestore
      db.collection('computers').doc(id).delete()
        .then(() => {
          this.computers = this.computers.filter( computer => {
          return computer.id != id
      })
        })
     
    }
  },
  created(){
    // fetch data from the firestore
    db.collection('computers').get()
      .then( snapshot => {
        // console.log(snapshot)
        snapshot.forEach(doc => {
           let computer = doc.data();
           computer.id = doc.id;
           this.computers.push(computer)
        })
      })
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

