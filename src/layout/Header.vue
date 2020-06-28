<template>
  <div class="header">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="#"><router-link to="/">Home</router-link></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link to="/chat"><i class="fas fa-inbox fa-2x"></i></router-link>
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
                <!-- <img
                  class="avatar"
                  src="https://yt3.ggpht.com/a-/AAuE7mAHA4BDG8acR-ACBolej4CcOO9BWMkfjRHCNPB_OA=s88-c-k-c0xffffffff-no-rj-mo"
                  alt=""
                /> -->
                <p>{{user.avatarAlias}}</p>
              </em>
            </template>
            <b-dropdown-item href="#"><router-link to="/profile">Profile</router-link></b-dropdown-item>
            <b-dropdown-item @click="onSignOut">Sign Out</b-dropdown-item>
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
import jwt_decode from 'jwt-decode'
export default {
  data() {
    return {
      user: { avatarAlias: ''},
      numberOfNotifications: 99,
      notificationIcon,
      authService: new AuthService()
    };
  },
  mounted() {
    const token = localStorage.getItem("access_token") || null;
    if (token) {
      const payload = jwt_decode(token);
      this.user.avatarAlias = payload.user_name;
    }
  },
  methods: {
    onClickGoToProfile(){
      this.$router.push("/profile");
    },
    onSignOut(){
      localStorage.clear();
      this.authService.signOut(); 
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