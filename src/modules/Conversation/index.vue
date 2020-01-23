<template>
  <div class="container-fluid h-100 main_content">
    <div class="row justify-content-center h-100">
      <div class="col-md-4 col-xl-3 chat">
        <div class="card mb-sm-3 mb-md-0 contacts_card">
          <div class="card-header">
            <div class="input-group">
              <input type="text" placeholder="Search..." name class="form-control search" />
              <div class="input-group-prepend">
                <span class="input-group-text search_btn">
                  <i class="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>
          <div class="card-body contacts_body">
            <ul class="contacts">
              <Contact
                :key="contact.id"
                v-for="contact in contacts"
                :isSelected="selectedContact.id === contact.id"
                :contact="contact"
                :onClick="onContactClicked"
              />
            </ul>
          </div>
          <div class="card-footer"></div>
        </div>
      </div>
      <div class="col-md-8 col-xl-6 chat">
        <div class="card">
          <div class="card-header msg_head">
            <div class="d-flex bd-highlight" v-if="selectedContact.id !== ''">
              <div class="img_cont">
                <img
                  src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                  class="rounded-circle user_img"
                />
                <span class="online_icon"></span>
              </div>
              <div class="user_info">
                <span>{{selectedContact.title}}</span>
                <p>1767 Messages</p>
              </div>
              <div class="video_cam">
                <span>
                  <i class="fas fa-video"></i>
                </span>
                <span>
                  <i class="fas fa-phone"></i>
                </span>
              </div>
            </div>
            <span id="action_menu_btn">
              <i class="fas fa-ellipsis-v"></i>
            </span>
            <div class="action_menu">
              <ul>
                <li>
                  <i class="fas fa-user-circle"></i> View profile
                </li>
                <li>
                  <i class="fas fa-users"></i> Add to close friends
                </li>
                <li>
                  <i class="fas fa-plus"></i> Add to group
                </li>
                <li>
                  <i class="fas fa-ban"></i> Block
                </li>
              </ul>
            </div>
          </div>
          <div class="card-body msg_card_body" ref="cardBodyRef" v-if="selectedContact.id !== ''">
            <Message v-for="message in messages" :key="message.id" :message="message" />
          </div>
          <form v-on:submit.prevent="onSubmit">
            <div class="card-footer">
              <div class="input-group">
                <div class="input-group-append">
                  <span class="input-group-text attach_btn">
                    <i class="fas fa-paperclip"></i>
                  </span>
                </div>
                <input
                  class="form-control type_msg"
                  v-model="newMessage"
                  placeholder="Type your message..."
                  autofocus
                />
                <div class="input-group-append">
                  <span class="input-group-text send_btn" @click="onSubmit">
                    <i class="fas fa-location-arrow"></i>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as signalr from "@aspnet/signalr";
import defaultVueLogo from "../../assets/logo.png";
import Message from "./Message";
import Contact from "./Contact";
import moment from "moment";
import { getContacts, getConversationInfo } from "./services";
import AuthService from "../../services/AuthService";

export default {
  name: "ChatBox",
  data() {
    return {
      connection: null,
      newMessage: "",
      hubConnection: null,
      defaultAvatar: defaultVueLogo,
      contacts: [],
      messages: [],
      selectedContact: {
        id: ""
      },
      message: "",
      authSevice: new AuthService(),
      userId: ''
    };
  },
  components: {
    Message,
    Contact
  },
  props: {
    msg: String
  },
  async mounted() {
    const user = await this.authSevice.getProfile();
    this.userId = user.chatUserId;

    this.connection = new signalr.HubConnectionBuilder()
    .configureLogging(signalr.LogLevel.None)
      .withUrl(`http://localhost:5000/hub/chat`, {
        accessTokenFactory: async () => {
          return new AuthService().getSignIn().then(res => {
            if (res) {
              return localStorage.getItem("access_token");
            }
          });
        },
        skipNegotiation: true,
        transport: 1
      })
      .build();

    await this.connection.start();

    const res = await getContacts();
    this.contacts = res.data;

    this.connection.on("ReceiveMessage", (res) => {
      const isResponse = res.senderId !== this.userId;
      this.messages.push({content: res.message, isResponse, sentAt: moment(new Date()).format("hh:mm A")});
    });
  },
  methods: {
    onContactClicked(id) {
      const contact = this.contacts.find(c => c.id === id);
      getConversationInfo(contact.userId).then((res) => {
        if(res){
          const data = res.data;
          const selectedContact = this.contacts.find(c => c.id === id);
          this.selectedContact = {
            ...selectedContact,
            title: data.title
          };
          this.messages = data.messages;
        }
      })
    },
    onSubmit() {
      if (!this.newMessage.trim()) {
        return;
      }

      this.connection
        .invoke("SendMessage", this.newMessage, this.selectedContact.userId)
        .then(() => {
          this.newMessage = "";
        });
      // this.messages.push({
      //   id: shortId(),
      //   content: this.newMessage,
      //   type: "sender",
      //   sentAt: moment(new Date()).format("MM-DD HH:mm")
      // });
      // this.$refs.cardBodyRef.scrollTop = this.$refs.cardBodyRef.scrollHeight;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main_content {
  height: 100%;
  margin: 0;
  background: #7f7fd5;
  background: -webkit-linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
  background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
}
</style>
