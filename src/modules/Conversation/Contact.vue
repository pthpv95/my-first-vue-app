<template>
  <li :class="{'active': isSelected}" @click="() => onClick(contact.id)">
    <div class="d-flex bd-highlight">
      <div class="img_cont">
        <img
          src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
          class="rounded-circle user_img"
        />
        <span class="online_icon"></span>
      </div>
      <div class="user_info">
        <span>{{contact.firstName }} {{contact.lastName}}</span>
        <p>Kalid is online</p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    isSelected: Boolean,
    contact: Object,
    onClick: Function
  },
};
</script>

<style>
</style>