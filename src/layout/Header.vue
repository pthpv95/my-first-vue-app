<template>
  <div class="header">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="#"><router-link to="/">Home</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav> -->
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right no-caret>
            <template v-slot:button-content>
              <em>
                <img class="avatar" :src="notificationIcon" />
                <h5 class="number-of-noti">{{numberOfNotifications}}</h5>
              </em>
            </template>
            <b-dropdown-item href="#">First message</b-dropdown-item>
            <b-dropdown-item href="#">Second message</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right no-caret>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>
                <img
                  class="avatar"
                  src="https://yt3.ggpht.com/a-/AAuE7mAHA4BDG8acR-ACBolej4CcOO9BWMkfjRHCNPB_OA=s88-c-k-c0xffffffff-no-rj-mo"
                />
              </em>
            </template>
            <b-dropdown-item href="#"><router-link to="/profile">Profile</router-link></b-dropdown-item>
            <b-dropdown-item><router-link to="/sign-out">Sign Out</router-link></b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <hr>
  </div>
</template>

<script>
import notificationIcon from "../assets/images/notification-icon.svg";
import AuthService from '../services/AuthService';

export default {
  data() {
    return {
      user: null,
      numberOfNotifications: 99,
      notificationIcon,
      authService: new AuthService()
    };
  },
  mounted() {
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
    onClickGoToProfile(){
      this.$router.push("/profile");
    },
    onSignOut(){
      
    }
  }
};
</script>

<style>
.header {
  background-color: gray;
}
.avatar {
  border-radius: 50%;
  width: 40px;
}
.dropdown-toggle::after {
  content: none;
}

.number-of-noti {
  position: absolute;
  left: 29px;
  top: 2px;
  background: rgb(204, 0, 0);
  border-radius: 50%;
  color: #ffffff;
}
</style>