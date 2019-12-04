import Vue from "vue"
import Router from "vue-router"
import SignUp from "../modules/SignUp"
import Home from "../modules/HomePage"
import Profile from "../modules/Profile"

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: "/",
      name: Home,
      component: Home
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ],
  mode: 'history'
})
