<template>
  <component :is="dynamicComponent" :[propsKey]="currentProps"></component>
  <!-- <CallBack :signinParams="signinParams"></CallBack> -->
</template>

<script>
import * as signalr from "@aspnet/signalr";
import AuthService from "./services/AuthService";
import Layout from "./layout";
import CallBackPage from "./modules/CallBack";

const userInfo = JSON.parse(localStorage.getItem("user_info"));

const connection = new signalr.HubConnectionBuilder()
  .withUrl(`http://localhost:5000/notification`, {
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
  async created() {
    connection.on("reveiveContactRequest", data => {
      console.log(data, "connectionid", connection.id);
    });

    try {
      const userInfo = localStorage.getItem("user_info");
      if (userInfo) {
        connection.qs = {
          userId: 1
        };
      }

      await connection.start();
      console.assert(connection.state === 1);
    } catch (error) {
      console.log("error", error);
      console.assert(connection.state === 0);
      setTimeout(() => start(), 3000);
    }
  },
  mounted() {
    const url = this.$router.history.current.hash.substring(1, 10);
    if (url === "/callback") {
      const rest = this.$router.history.current.hash.substring(10);
      this.currentProps = `${url}#${rest}`;
      this.propsKey = "signinParams";
      this.dynamicComponent = "CallBack";
    }

    this.authService.getSignIn().then(isSignIn => {
      if (isSignIn) {
        this.isAuthenticated = isSignIn;
        this.dynamicComponent = "Layout";
      }
    });
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
