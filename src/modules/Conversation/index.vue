<template>
  <div>
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index">
        <p>{{message}}</p>
      </div>
    </div>
    <div class="input-zone">
      <form>
        <label>Message:</label>
        <input v-model="newMessage" class="input-zone-input" type="text" />
        <button type="submit" @click="sendMessage">Send</button>
      </form>
    </div>
    <Stories name="this is a great story." />
  </div>
</template>
<script>
import Stories from "./Stories/StoryList.vue";
import * as signalr from "@aspnet/signalr";

const connection = new signalr.HubConnectionBuilder()
  .withUrl("https://localhost:5001/chat", {
    skipNegotiation: true,
    transport: 1
  })
  .build();

export default {
  name: "LandingPage",
  data() {
    return {
      newMessage: "",
      messages: [],
      hubConnection: null
    };
  },
  components: {
    Stories
  },
  props: {
    msg: String
  },
  async created() {
    connection.on("broadcastMessage", message => {
      this.messages.push(message);
    });

    try {
      await connection.start();
      console.assert(connection.state === 1);
      // console.log("connected");
    } catch (error) {
      console.assert(connection.state === 0);
      // console.log("Disconnected => retryy");
      setTimeout(() => start(), 3000);
    }
  },
  methods: {
    handleCreated() {},
    sendMessage(e) {
      e.preventDefault();
      connection.invoke("send", this.newMessage).then(() => {
        this.newMessage = "";
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
