<template>
  <component :is="dynamicComponent" :[propsKey]="currentProps"></component>
</template>

<script>
import * as signalr from "@aspnet/signalr";
import AuthService from "./services/AuthService";
import Layout from "./layout";
import CallBackPage from "./modules/CallBack";

const connection = new signalr.HubConnectionBuilder()
  .withUrl(`http://localhost:5000/notification`, {
    accessTokenFactory: async () => {
      return new AuthService().getSignIn().then((res) => {
        if(res){
          return localStorage.getItem('access_token');
        }
      })
    },
    skipNegotiation: true,
    transport: 1
  })
  .build();

export default {
  name: "app",
  data() {
    return {
      authService: new AuthService(),
      isAuthenticated: false,
      dynamicComponent: "Layout",
      currentProps: "",
      propsKey: ""
    };
  },
  components: {
    Layout,
    CallBack: CallBackPage
  },
  async created() {},
  mounted() {
    this.authService.getSignIn().then(isSignIn => {
      if (isSignIn) {
        this.isAuthenticated = isSignIn;
        this.dynamicComponent = "Layout";
        // connection.on("reveiveContactRequest", data => {
        //   console.log(data, "connectionid", connection.id);
        // });
        
        // connection.start();
      }
    });

    const url = this.$router.history.current.fullPath.substring(0, 9);
    if (url === "/callback") {
      const rest = this.$router.history.current.hash.substring(10);
      this.currentProps = `${url}#${rest}`;
      this.propsKey = "signinParams";
      this.dynamicComponent = "CallBack";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
