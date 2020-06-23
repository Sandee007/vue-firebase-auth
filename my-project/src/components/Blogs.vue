<template>
  <div class="blogs">
      <h2>Blogs</h2>
      <input type="text" v-model="searchTerm">
      <!-- <div v-for="post in posts" :key="post.id" > -->
      <div v-for="post in filteredPosts" :key="post.id" >
          <h3> {{post.title}} </h3>
          <p> {{post.body | snippet }} </p>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Blogs',
    data(){
        return{
            posts:[
                {title: 'Angular' , body: 'Angular has a steep learning curve, considering it is a complete solution, and mastering Angular requires you to learn associated concepts like TypeScript and MVC. Even though it takes time to learn Angular, the investment pays dividends in terms of understanding how the front end works.' ,id:1 },
                {title: 'React' , body: 'React offers a Getting Started guide that should help one set up React in about an hour. The documentation is thorough and complete, with solutions to common issues already present on Stack Overflow. React is not a complete framework and advanced features require the use of third-party libraries. This makes the learning curve of the core framework not so steep but depends on the path you take with additional functionality. However, learning to use React does not necessarily mean that you are using the best practices.' ,id:2 },
                {title: 'Vue' , body: 'Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option. However, simplicity and flexibility of Vue is a double-edged sword — it allows poor code, making it difficult to debug and test.' ,id:2 }
            ],
            searchTerm: ''
        }
    },
    methods: {

    },
    computed: {
        filteredPosts(){
            return this.posts.filter(post => {
                return post.title.match(this.searchTerm) //returns  a boolean
            });
        }
    },
    created(){
        axios.get('http://jsonplaceholder.typicode.com/posts')
            .then( response => {
                console.log(response);
                // localStorage.setItem('posts', response.data);  <-- my work
                this.posts = response.data;
                // this.posts = localStorage.getItem('posts'); <-- not working,my work
            }).catch( err => console.log(err))
    }

}
</script>

<style>

</style>