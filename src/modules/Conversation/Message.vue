<template>
  <div>
    <div class="d-flex justify-content-start mb-4" v-if="message.isResponse">
      <div class="img_cont_msg">
        <img
          src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
          class="rounded-circle user_img_msg"
        />
      </div>
      <div class="msg_cotainer">
        {{message.content}}
        <span class="msg_time">{{message.sentAt}}</span>
      </div>
    </div>
    <div class="d-flex justify-content-end mb-4" v-else>
      <div class="msg_cotainer_send">
          {{message.content}}
        <span class="msg_time_send">{{message.sentAt}}</span>
      </div>
      <div class="img_cont_msg">
        <img src="https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg" class="rounded-circle user_img_msg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {};
  },
  props: {
    message: Object
  }
};
</script>

<style>
</style>