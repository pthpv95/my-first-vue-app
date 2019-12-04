<template>
  <div>
    <h2>Hello {{user.firstName}} {{user.lastName}}</h2>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user: {
        firstName: '',
        lastName: ''
      }
    }
  },
  async mounted() {
    const userInfo = JSON.parse(localStorage.getItem("user_info")) || null;
    if (userInfo) {
      this.user = {
        id: userInfo.id,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName
      };
    }
  },
  methods: {
    logout() {
      this.user = null;
      localStorage.removeItem("user_info");
      this.$router.push("/sign-up");
    },
  }
}
</script>

<style>

</style>