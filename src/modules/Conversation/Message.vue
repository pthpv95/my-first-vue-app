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
        <template v-if="message.messageType === 0 && message.text">{{message.text}}</template>
        <img v-else :src="message.attachmentUrl" width="200px" height="200px"/>
        <span class="msg_time">{{message.sentAt}}</span>
      </div>
    </div>
    <div class="d-flex justify-content-end mb-4" v-else>
      <div class="msg_cotainer_send">
        <template v-if="message.messageType === 0 && message.text">{{message.text}}</template>
        <img v-else :src="message.attachmentUrl" width="200px" height="200px"/>
        <span class="msg_time_send">{{message.sentAt}}</span>
      </div>
      <div class="img_cont_msg">
        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg" />
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