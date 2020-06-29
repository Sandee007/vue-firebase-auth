<template>
   <div class="edit-computer container" v-if="computer">
     <!-- <h2>Edit Computer {{this.$route.params.computer_slug}} </h2> -->
     <h2> Edit {{computer.title}} </h2>

    <form @submit.prevent="editComputer">
      <div class="field title">
        <label for="title"> Computer Type : </label>
        <input type="text" name="title" v-model="computer.title">
      </div>
      <div v-for="(spec, index) in computer.specs" :key="index" class="field">
        <label for="spec"> Spec :</label>
        <input type="text" name="spec" v-model="computer.specs[index]">
        <i class="material-icons delete" @click="deleteSpec(spec)">delete</i>
      </div>
      <div class="field add-spec">
        <label for="add-spec"> Add Spec : </label>
        <input type="text" name="spec" @keydown.tab.prevent="addSpec" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text"> {{feedback}} </p>
        <button class="btn "> Update Computer </button>
      </div>
    </form>

   </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'EditComputer',
  data(){
    return{
      computer:null,
      another: null,
      feedback: null
    }
  },
  created(){
    let ref = db.collection('computers').where('slug', '==', this.$route.params.computer_slug);
    ref.get()
      .then(snapshot => {
        // console.log(snapshot)
       snapshot.forEach(doc => {
        //  console.log(doc.data())
        this.computer = doc.data();
        this.computer.id = doc.id;
        })
      }).catch(err => console.log(err))
  },
  methods:{
    editComputer(){
       if(this.computer.title){
        this.feedback = null;

        // create a slug
        this.computer.slug = slugify(this.computer.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        // console.log(this.slug)
        db.collection('computers').doc(this.computer.id).update({
          title: this.computer.title,
          specs: this.computer.specs,
          slug: this.computer.slug
        }).then( () => {
          this.$router.push( { name:'Index'})
        }).catch( err => console.log(err))

      }else{
        this.feedback = "Computer type can't be empty"
      }
    },
     addSpec(){
      if(this.another){
        this.computer.specs.push(this.another);
        this.another = null;
        this.feedback = null;
      } else{
        this.feedback = "Specs can't be empty";
      }
    },
    deleteSpec(spec){
      this.computer.specs = this.computer.specs.filter(s =>{
        return s != spec ;
      })
    }
  }
}
</script>

<style>
.edit-computer{
  margin: 60px auto ;
  padding: 20px;
  max-width: 500px;
}
.edit-computer h2{
  font-size: 2em;
  margin: 20px auto;
}
.edit-computer .field{
  margin: 20px auto;
  position: relative;
}
.edit-computer .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;

}
</style>