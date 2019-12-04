<template>
  <Layout></Layout>
</template>

<script>
import Layout from "./layout";
import * as signalr from "@aspnet/signalr";

const userInfo = JSON.parse(localStorage.getItem("user_info"));

const connection = new signalr.HubConnectionBuilder()
  .withUrl(`http://localhost:5000/notification?userId=${userInfo.id}`, {
    skipNegotiation: true,
    transport: 1
  })
  .build();

export default {
  name: "app",
  components: {
    Layout
  },
  async created() {
    connection.on("reveiveContactRequest", data => {
      console.log(data, "connectionid", connection.id);
    });

    try {
      const userInfo = localStorage.getItem("user_info");
      if (userInfo) {
        connection.qs = {
          userId: userInfo.id
        };
      }

      await connection.start();
      console.assert(connection.state === 1);
    } catch (error) {
      console.assert(connection.state === 0);
      setTimeout(() => start(), 3000);
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
