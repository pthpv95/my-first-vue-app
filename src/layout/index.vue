<template>
  <div id="app">
    <Header></Header>
    <div class="main-page">
      <div id="messagesList"></div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './Header';
export default {
  components:{
    Header
  }
}
</script>

<style>
/* .main-page{
  background-color: rgba(var(--b3f,250,250,250),1)
} */
</style>