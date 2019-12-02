<template>
  <div>
    <b-container>
      <div v-if="!isLoggedIn">
        <SignIn />
        <router-link v-if="!user" to="/sign-up">Sign up ?</router-link>
      </div>
      <h3 v-if="user !== null">
        Hello
        <strong>{{user.firstName}} {{user.lastName}}</strong>
      </h3>
    </b-container>
    <b-container v-if="isLoggedIn">
      <p>Your suggested friends</p>
      <b-row>
        <b-col v-for="contact in suggestedContacts" :key="contact.id">
          <b-card
            :title="contact.firstName + ' ' + contact.lastName"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
          >
            <b-button
              href="#"
              variant="primary"
              @click="() => onFriendRequestedToAdd(contact.id)"
            >Add friend</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import * as signalr from "@aspnet/signalr";

import { getFriendSuggestions, addContact } from "./services";
import SignIn from "../SignIn";

const connection = new signalr.HubConnectionBuilder()
  .withUrl("http://localhost:5000/notification", {
    skipNegotiation: true,
    transport: 1
  })
  .build();

export default {
  name: "Home",
  data() {
    return {
      isLoggedIn: false,
      user: null,
      suggestedContacts: []
    };
  },
  components: {
    SignIn
  },
  props: {
    msg: String
  },
  async created() {
    
  },
  async mounted() {
    connection.on('reveiveContactRequest', data => {
      console.log(data,'connectionid', connection.id);
    });

    try {
      await connection.start();
      console.assert(connection.state === 1);
    } catch (error) {
      console.assert(connection.state === 0);
      setTimeout(() => start(), 3000);
    }

    const userInfo = JSON.parse(localStorage.getItem("user_info")) || null;
    if (userInfo) {
      this.user = {
        id: userInfo.id,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName
      };
      // const result = await getFriendSuggestions(userInfo.id);
      // this.suggestedContacts = result.data;
      this.isLoggedIn = true;
    }
  },
  methods: {
    logout() {
      this.user = null;
      localStorage.removeItem("user_info");
      this.$router.push("/sign-up");
    },
    onFriendRequestedToAdd(contactId) {
      addContact(this.user.id, contactId).then(res => {
        if (res) {
          // this.suggestedContacts = this.suggestedContacts.filter(
          //   c => c.id !== contactId
          // );
        }
      });
    }
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
