<template>
  <div>
    <b-container>
      <b-row align-h="end">
        <router-link v-if="!user" to="/sign-up">Sign up ?</router-link>
        <h3 v-if="user !== null">
          Hello
          <strong>{{user.firstName}} {{user.lastName}}</strong>
        </h3>
        <a v-if="user" variant="info" @click="logout">Log out</a>
      </b-row>
    </b-container>
    <b-container>
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
import { getFriendSuggestions, addContact } from "./services";

export default {
  name: "Home",
  data() {
    return {
      user: null,
      userInfo: JSON.parse(localStorage.getItem("user_info")) || null,
      suggestedContacts: []
    };
  },
  components: {},
  props: {
    msg: String
  },
  async created() {},
  async mounted() {
    if (this.userInfo) {
      this.user = {
        id: this.userInfo.id,
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName
      };
      const result = await getFriendSuggestions(this.userInfo.id);
      this.suggestedContacts = result.data;
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
          this.suggestedContacts = this.suggestedContacts.filter(c => c.id !== contactId);
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
