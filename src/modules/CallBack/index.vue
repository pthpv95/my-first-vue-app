<template>
</template>

<script>
import AuthService from '../../services/AuthService';

export default {
  data(){
    return {
      authService: new AuthService(),
    }
  },
  mounted(){
    let self = this;
    this.authService.signinRedirectCallback().then((user) => {
      if(user){
        this.$router.push('/');
      }else{
        window.location.href = 'http://localhost:5050'
      }
    })
  },
  props: {
    signinParams: String
  }
}
</script>

<style>

</style>