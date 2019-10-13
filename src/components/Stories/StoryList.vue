<template>
  <div id="stories">
    <users :users="users"/>
  </div>
</template>

<script>
import shortId from "shortid";
import users from "./User";

export default {
  data() {
    return {
      content: "stories",
      value: 10,
      products: [
        {
          id: 1,
          name: "Apple watchh"
        },
        {
          id: 2,
          name: "Macbook..."
        }
      ],
      users: [
        {
          id: shortId.generate(),
          name: "james",
          avatar:
            "https://instagram.fsgn2-3.fna.fbcdn.net/vp/fee0be983f26558d74a519c0ab6cb8dd/5E213DBB/t51.2885-15/sh0.08/e35/p640x640/53558655_117355726103542_2574166885940887171_n.jpg?_nc_ht=instagram.fsgn2-3.fna.fbcdn.net&_nc_cat=110%20640w,https://instagram.fsgn2-3.fna.fbcdn.net/vp/53617f7fe4000ce5ca736014da05cfd1/5E2BA4BB/t51.2885-15/sh0.08/e35/p750x750/53558655_117355726103542_2574166885940887171_n.jpg?_nc_ht=instagram.fsgn2-3.fna.fbcdn.net&_nc_cat=110%20750w,https://instagram.fsgn2-3.fna.fbcdn.net/vp/e1d1801d0394f3d6cb816640bdcc8337/5E2D764D/t51.2885-15/e35/53558655_117355726103542_2574166885940887171_n.jpg?_nc_ht=instagram.fsgn2-3.fna.fbcdn.net&_nc_cat=110%201080w",
          stories: [
            {
              id: shortId.generate(),
              image: "",
              postedWhen: "2h"
            },
            {
              id: shortId.generate(),
              image: "",
              postedWhen: "3h"
            }
          ]
        },
        {
          id: shortId.generate(),
          name: "tam",
          avatar:
            "https://instagram.fsgn2-4.fna.fbcdn.net/vp/016110dbf7f4e01d11d4be73ceffbaf7/5E37CCEB/t51.2885-15/sh0.08/e35/s640x640/64684052_328287034755407_5434419012785609371_n.jpg?_nc_ht=instagram.fsgn2-4.fna.fbcdn.net&_nc_cat=111%20640w,https://instagram.fsgn2-4.fna.fbcdn.net/vp/130719bad576f074389e9b90a1ddd9f2/5E390FEB/t51.2885-15/sh0.08/e35/s750x750/64684052_328287034755407_5434419012785609371_n.jpg?_nc_ht=instagram.fsgn2-4.fna.fbcdn.net&_nc_cat=111%20750w,https://instagram.fsgn2-4.fna.fbcdn.net/vp/1065b15011a730b87168fa6589a40d7f/5E2B505C/t51.2885-15/e35/s1080x1080/64684052_328287034755407_5434419012785609371_n.jpg?_nc_ht=instagram.fsgn2-4.fna.fbcdn.net&_nc_cat=111%201080w",
          stories: [
            {
              id: shortId.generate(),
              image: "",
              postedWhen: "5h"
            },
            {
              id: shortId.generate(),
              image: "",
              postedWhen: "7h"
            }
          ]
        },
        {
          id: shortId.generate(),
          name: "lee",
          avatar:
            "https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/41413816_1870128229750376_7826443235319873536_n.jpg?_nc_cat=105&_nc_oc=AQmIch4RTu80kHGjhzEeBJHjET0d1_3BLoe1bCfAeDRay60-CGmqrzqwflqIMdd2XM5f1ZPCViOhk5IdMYEnj5ee&_nc_ht=scontent.fsgn2-2.fna&oh=4631f298ec609da62cf29c7b8bfd1364&oe=5E2839BA",
          stories: [
            {
              id: shortId.generate(),
              image: "",
              postedWhen: "5h"
            },
            {
              id: shortId.generate(),
              image: "",
              postedWhen: "7h"
            }
          ]
        }
      ]
    };
  },
  methods: {
    onHold: function() {
      this.value--;
    },
    onClickUser(id) {
      const selectedUser = this.users.find(u => u.id === id);
      this.selectedUser = selectedUser;
    }
  },
  components: {
    users
  },
  props: {
    name: String
  },
  computed: {}
};
</script>
