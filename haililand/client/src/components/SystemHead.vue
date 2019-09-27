<template>
  <div class="top">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo head"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <h2>haoliland后台管理系统</h2>
      </el-menu-item>
      <router-link to="/login" id="header-login" class="username">Hi,{{userInfo.username}}</router-link>
      <span id="header-login" @click="unLogin" class="unlogin">退出</span>
    </el-menu>
  </div>
</template>
<script>
export default {
  computed: {
    userInfo: {
      set: function(val) {},
      get: function() {
        return this.$store.state.userInfo;
      }
    }
  },
  data() {
    return {
      activeIndex2: "1"
    };
  },

  created: function() {
    this.userInfo = this.$store.state.userInfo;
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    unLogin() {
      console.log(this.userInfo.username);
      this.axios
        .post("/user/unlogin", {username:this.userInfo.username})
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
      this.$store.commit("removeUserInfo"); //同步
      this.$router.push({ path: "/login" });
    }
  },
  created() {
    if (this.$route.path == "/reg") {
      this.activeIndex2 = "7";
    }
    // console.log(this.$route.path);
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.head {
  width: 100%;
  position: relative;
}
.username {
  position: absolute;
  right: 70px;
  top: 30%;
  width: 60px;
  text-decoration: none;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.unlogin {
  position: absolute;
  right: 10px;
  top: 30%;
  display: inline-block;
  width: 60px;
  cursor: pointer;
  color: #fff;
  /* background-color: blue */
}
a {
  color: #fff;
}
</style>