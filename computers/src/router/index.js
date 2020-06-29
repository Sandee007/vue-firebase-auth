import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddComputer from '@/components/AddComputer'
import EditComputer from '@/components/EditComputer'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-computer',
      name: 'AddComputer',
      component: AddComputer
    },
    {
      path: '/edit-computer/:computer_slug',
      name: 'EditComputer',
      component: EditComputer
    }
   
  ]
})
