import Vue from "vue"
import Router from "vue-router"
import SignUp from "../modules/SignUp"
import Home from "../modules/HomePage"
import Profile from "../modules/Profile"
import SilentRenew from '../modules/SilentRenew'
import ChatConversation from "../modules/Conversation"

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
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/silent-renew",
      name: "silentrenew",
      component: SilentRenew
    },
    {
      path: "/chat",
      name: "ChatBox",
      component: ChatConversation
    }
  ],
  mode: "history"
})
