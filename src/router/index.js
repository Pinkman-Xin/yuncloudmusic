import Vue from 'vue'
import VueRouter from 'vue-router'
  Vue.use(VueRouter)
const Recommend = (resolve) => {
  import('../views/Recommend').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../views/Rank').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('../views/Singer').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../views/Search').then((module) => {
    resolve(module)
  })
} 
const Detail = (resolve) => {
  import('../views/Detail').then((module) => {
    resolve(module)
  })
}
const Account = (resolve) => {
  import('../views/Account').then((module) => {
    resolve(module)
  })
}
const routes = [
{path:'/',redirect:'/recommend'},
{path:'/rank',component:Rank,
children:[{
  path:'detail/:id/:type',
  component:Detail
}]},
{path:'/recommend',component:Recommend,
children:[{
  path:'detail/:id/:type',
  component:Detail
}]},
{path:'/singer',component:Singer,
children:[{
  path:'detail/:id/:type',
  component:Detail
}]
},
{path:'/search',component:Search},
{path:'/account',component:Account}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
