<template>
  <b-container>
    <p>Users</p>
    <b-col v-if="selectedUser">
      <b-card
        :title="selectedUser.name"
        :img-src="selectedUser.avatar"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>Some quick example text.</b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-col>
    <b-row>
      <b-col
        v-for="user in users"
        :key="user.id"
        @click="onClickUser(user.id)"
        @mouseover="onMouseOver(user.id)"
        @mouseout="onMouseOut"
        class="user-item"
        :id="user.id"
      >
        {{user.name}}
        <b-popover :target="user.id" triggers="hover" placement="top">
          <b-card
            :title="user.name"
            :img-src="user.avatar"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <!-- <b-link href="#" class="card-link">{{user.name}}</b-link> -->
            <b-button href="#" variant="primary">Add friend</b-button>
          </b-card>
        </b-popover>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import shortId from "shortid";
import { BAlert, BCard, BContainer, BRow, BCol } from "bootstrap-vue";

export default {
  data() {
    return {
      selectedUser: null
    };
  },
  methods: {
    onMouseOver(id) {
      const selectedUser = this.users.find(u => u.id === id);
      // this.selectedUser = selectedUser;
    },
    onMouseOut(e) {
      // this.selectedUser = null;
    },
    onClickUser(id) {
      const selectedUser = this.users.find(u => u.id === id);
      this.selectedUser = selectedUser;
    },
    tipMethod() {
      return "<strong>" + new Date() + "</strong>";
    }
  },
  computed: {},
  components: {
    BAlert,
    BCard,
    BContainer,
    BRow
  },
  props: {
    users: Array
  }
};
</script>
<style scoped>
.user-flex-container {
  display: flex;
  flex-wrap: nowrap;
}
.user-item {
  background-color: antiquewhite;
  width: 100px;
  text-align: center;
  font-size: 30px;
  margin: 30px;
}
</style>


<!-- <div class="user-flex-container">
      <div
        class="user-item"
        v-for="user in users"
        :key="user.id"
        @click="onClickUser(user.id)"
        @mouseover="onMouseOver(user.id)"
        @mouseout="onMouseOut"
      >
        <div>{{user.name}}</div>
      </div>
    </div>
    <div v-if="selectedUser">
      <b-card
        :title="selectedUser.name"
        :img-src="selectedUser.avatar"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>Some quick example text.</b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </div>
  </div>-->