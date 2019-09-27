<template>
  <div class="system">
    <system-head></system-head>
    <div class="con">
      <system-said></system-said>
      <div class="main">
        <input type="hidden" :value="uid" />
        用户名：
        <input type="text" :value="tel" />
        <br />用户密码：
        <input type="text" :value="passwd" />
        <br />管理员：
        <el-radio v-model="radio" :label="0">非管理员</el-radio>
        <el-radio v-model="radio" :label="1">是管理员</el-radio>
        <br />
        <el-button @click="eddUser" size="small">修改</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uid: this.$route.params.uid,
      tel: "",
      passwd: "",
      radio: ""
    };
  },
  created: function() {
    this.axios
      .get("/user/eadituserinfo", {
        params: {
          uid: this.uid
        }
      })
      .then(res => {
        console.log(res.data[0].admin);
        this.tel = res.data[0].tel;
        this.passwd = res.data[0].passwd;
        this.radio = res.data[0].admin;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    eddUser: function() {
      this.axios
        .post("/user/edduser", {
             uid: this.$route.params.uid,
             tel:this.tel,
             passwd:this.passwd,
             admin:this.radio
        })
        .then(res => {
          console.log(res);
          this.$router.push({ path: "/systemuser" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.con {
  position: relative;
}
.main {
  position: absolute;
  left: 19.5%;
  top: 0;
  width: 80%;
  height: 100%;
}
</style>