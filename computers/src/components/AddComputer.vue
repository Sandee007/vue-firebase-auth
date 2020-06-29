<template>
  <div class="add-computer container">
    <h2 class="center-align grey-text" >Add New Computer</h2>

    <form @submit.prevent="addComputer">
      <div class="field title">
        <label for="title"> Computer Type : </label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(spec, index) in specs" :key="index" class="field">
        <label for="spec"> Spec :</label>
        <input type="text" name="spec" v-model="specs[index]">
        <i class="material-icons delete" @click="deleteSpec(spec)" >delete</i>
      </div>
      <div class="field add-spec">
        <label for="add-spec"> Add Spec : </label>
        <input type="text" name="spec" @keydown.tab.prevent="addSpec"  v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text"> {{feedback}} </p>
        <button class="btn"  > Add Computer </button>
      </div>
    </form>

  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'AddComputer',
  data(){
    return{
      title: null,
      another: null,
      specs: [],
      feedback: null,
      slug: null
    }
  },
  methods:{
    addComputer(){
      if(this.title){
        this.feedback = null;

        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        // console.log(this.slug)
        db.collection('computers').add({
          title: this.title,
          specs: this.specs,
          slug: this.slug
        }).then( () => {
          this.$router.push( { name:'Index'})
        }).catch( err => console.log(err))

      }else{
        this.feedback = "Computer type can't be empty"
      }
    },
    addSpec(){
      if(this.another){
        this.specs.push(this.another);
        this.another = null;
        this.feedback = null;
      } else{
        this.feedback = "Specs can't be empty";
      }
    },
    deleteSpec(spec){
      this.specs = this.specs.filter(s =>{
        return s != spec ;
      })
    }
  }
}
</script>

<style>
.add-computer{
  margin: 60px auto ;
  padding: 20px;
  max-width: 500px;
}
.add-computer h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-computer .field{
  margin: 20px auto;
  position: relative;
}
.add-computer .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;

}
</style>