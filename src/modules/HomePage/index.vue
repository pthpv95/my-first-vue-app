<template>
  <div>
    <div class="mt-3">
    <b-button-group>
      <b-button v-if="user" variant="info" @click="logout">Log out</b-button>
    </b-button-group>
  </div>
    <router-link v-if="!user" to="/sign-up">Sign up ?</router-link>
    <h3 v-if="user !== null">Hello {{user.firstName}} {{user.lastName}}</h3>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      user: null,
      userInfo: JSON.parse(localStorage.getItem("user_info")) || null
    };
  },
  components: {},
  props: {
    msg: String
  },
  async created() {
    
  },
  mounted(){
    if(this.userInfo){
      this.user = {
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
      }
    }
  },
  methods: {
    logout(){
      this.user = null;
      localStorage.removeItem("user_info")
      this.$router.push('/sign-up')
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
