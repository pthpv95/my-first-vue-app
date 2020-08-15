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
                :key="contact.key"
                v-for="contact in contacts"
                :isSelected="selectedContact.id === contact.id"
                :typingConversations="typingConversations"
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
          <div v-if="selectedContact.id === '' && this.user">Hello {{this.user.userName}}</div>
          <form v-on:submit.prevent="onSubmit" v-if="selectedContact.id !== ''">
            <div class="card-footer">
              <div v-if="selectedFile">
                <img :src="selectedFile.previewSource" width="120px" height="120px" />
                <i class="fas fa-trash-alt" @click="onRemoveFile"></i>
              </div>
              <div class="input-group">
                <div class="input-group-append">
                  <span class="input-group-text attach_btn" @click="onUploadFile">
                    <i class="fas fa-image"></i>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      ref="fileUploadRef"
                      @change="onFileChange"
                    />
                  </span>
                </div>
                <input
                  class="form-control type_msg"
                  v-model="newMessage"
                  placeholder="Type your message..."
                  ref="messageInputRef"
                  @keyup="onTyping"
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
import { uploadFile, BASE_URL } from "../../services/HttpClient";
import AuthService from "../../services/AuthService";
import shortId from "shortid";
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
        id: "",
      },
      message: "",
      authSevice: new AuthService(),
      user: null,
      selectedFile: null,
      selectedConversationId: null,
      typingConversations: [],
    };
  },
  components: {
    Message,
    Contact,
  },
  props: {
    msg: String,
  },
  destroyed() {
    this.selectedConversationId = null;
  },
  async mounted() {
    const user = await this.authSevice.getProfile();
    this.user = {
      id: user.chat_user_id,
      userName: user.user_name,
    };

    const connection = new signalr.HubConnectionBuilder()
      .configureLogging(signalr.LogLevel.Trace)
      .withUrl(`${BASE_URL}hub/chat`, {
        accessTokenFactory: async () => {
          return new AuthService().getSignIn().then((res) => {
            if (res) {
              return localStorage.getItem("access_token");
            }
          });
        },
        skipNegotiation: true,
        transport: 1,
      })
      .configureLogging(signalr.LogLevel.Error)
      .build();

    this.connection = connection;

    async function start() {
      try {
        await connection.start();
        console.log("connected");
      } catch (err) {
        console.log(err);
        setTimeout(() => start(), 5000);
      }
    }

    await start();

    const res = await getContacts();
    this.contacts = res.data.map((c) => ({ ...c, key: shortId.generate() }));
    this.connection.on("HasNewPrivateMessageAsync", (res) => {
      if (res.conversationId === this.selectedConversationId) {
        const isResponse = res.senderId !== this.user.id;
        this.messages.push({
          id: res.messageId,
          sentBy: res.sentBy,
          text: res.message,
          messageType: res.messageType,
          attachmentUrl: res.attachmentUrl,
          isResponse,
          seen: res.seen,
          sentAt: moment(new Date()).format("HH:mm"),
        });
        if (isResponse) {
          const receiverId = res.senderId;
          console.log("read", this.selectedConversationId);
          this.connection.invoke("ReadMessage", res.messageId, receiverId);
          this.typingConversations = this.typingConversations.filter(
            (x) => x !== this.selectedConversationId
          );
          this.connection.invoke(
            "MessageStopTyping",
            this.selectedConversationId,
            this.selectedContact.userId
          );
        }
      } else {
        const contact = this.contacts.find((c) => c.sentBy === res.sentBy);
        console.log("new message in", contact.firstName);
      }
    });

    this.connection.on("ReceiveReadReadMessageAsync", (data) => {
      const lastMessage = this.messages.find((m) => m.id === data.messageId);
      if (
        lastMessage &&
        lastMessage.id === data.messageId &&
        data.seenerId !== this.user.id
      ) {
        lastMessage.seen = true;
        this.messages.forEach((mes, index) => {
          if (index === this.messages.length - 1) {
            mes.seen = true;
          } else {
            mes.seen = false;
          }
        });
      }
    });

    this.connection.on("Typing", (data) => {
      const userTyping = this.contacts.find(
        (c) => c.contactUserId === data.userId
      );
      console.log(userTyping.firstName, "is typing");
      userTyping.typing = true;
      this.typingConversations.push(data.conversationId);

      this.contacts = this.contacts.map((c) => {
        c.typing = c.contactUserId === data.userId;
        c.key = shortId.generate();
        return c;
      });
    });

    this.connection.on("StopTyping", (data) => {
      const userTyping = this.contacts.find(
        (c) => c.contactUserId === data.userId
      );
      console.log(userTyping.firstName, "is stop typing");
      this.contacts = this.contacts.map((c) => {
        c.typing = !c.contactUserId === data.userId;
        c.key = shortId.generate();
        return c;
      });
      this.typingConversations = this.typingConversations.filter(
        (t) => t !== data.conversationId
      );
    });
  },
  updated() {
    if (this.$refs.cardBodyRef && !this.newMessage) {
      this.$refs.messageInputRef.focus();
      this.$refs.cardBodyRef.scrollTop =
        this.$refs.cardBodyRef.scrollHeight -
        this.$refs.cardBodyRef.clientHeight;
    }
  },
  methods: {
    onContactClicked(id) {
      const contact = this.contacts.find((c) => c.id === id);
      this.selectedContact.id = contact.userId;
      getConversationInfo(contact.userId).then((res) => {
        if (res) {
          const data = res.data;
          const selectedContact = this.contacts.find((c) => c.id === id);
          this.selectedContact = {
            ...selectedContact,
            title: data.title,
            conversationId: data.id,
          };
          this.selectedConversationId = data.id;
          this.messages = data.messages;
          this.newMessage = "";
          if (data.messages.length > 0 && data.messages.some((m) => !m.seen)) {
            const message = data.messages[data.messages.length - 1];
            if (message.isResponse) {
              const messageId = message.id;
              this.connection.invoke("ReadMessage", messageId, contact.userId);
            }
          }
        }
      });
    },
    onSubmit() {
      if (!this.newMessage.trim() && !this.selectedFile) {
        return;
      }

      if (this.selectedFile) {
        uploadFile(this.selectedFile.file)
          .then((res) => {
            const id = res.data;
            const fileURL = `${BASE_URL}files/${id}`;
            this.connection
              .invoke(
                "SendMessage",
                this.newMessage,
                fileURL,
                this.selectedContact.userId,
                this.selectedConversationId
              )
              .then(() => {
                this.newMessage = "";
                this.selectedFile = null;
              });
            return;
          })
          .catch((error) => {
            throw error;
          });
      } else {
        this.connection
          .invoke(
            "SendMessage",
            this.newMessage,
            null,
            this.selectedContact.userId,
            this.selectedConversationId
          )
          .then(() => {
            this.newMessage = "";
          });
      }
    },
    onUploadFile() {
      this.$refs.fileUploadRef.click();
    },
    onFileChange(e) {
      const files = e.target.files;
      this.selectedFile = {
        file: files[0],
      };
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFile = {
          ...this.selectedFile,
          previewSource: reader.result,
        };
      };
      if (files) {
        reader.readAsDataURL(files[0]);
      }
    },
    onRemoveFile() {
      this.selectedFile = null;
    },
    onTyping(e) {
      if (
        e.target.value &&
        this.typingConversations.every((x) => x !== this.selectedConversationId)
      ) {
        this.typingConversations.push(this.selectedConversationId);
        this.connection.invoke(
          "MessageTyping",
          this.selectedConversationId,
          this.selectedContact.userId
        );
      } else if (!e.target.value) {
        this.typingConversations = this.typingConversations.filter(
          (x) => x !== this.selectedConversationId
        );
        this.connection.invoke(
          "MessageStopTyping",
          this.selectedConversationId,
          this.selectedContact.userId
        );
      }
    },
  },
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
