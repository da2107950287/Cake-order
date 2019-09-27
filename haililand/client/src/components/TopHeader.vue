<template>
  <div class="header">
    <div class="logo">
      <h1>
        <router-link to="/">
          <img src="../static/images/logo.png" alt="logo" />
        </router-link>
      </h1>
    </div>

    <div class="nav">
      <div class="nav-top">
        <div v-if="!userInfo.username">
          <router-link to="/region" id="header-register">注册</router-link>
          <router-link to="/login" id="header-login">登录</router-link>
        </div>
        <div v-else>
          <span class="unlogin" id="header-login" @click="unLogin">退出</span>
          <router-link to="/login" id="header-login" class="username">Hi,{{userInfo.username}}</router-link>
        </div>
        <router-link to="/cart">
          <i></i>
          <span id="h-num">{{this.$store.getters.getAllProduct}}</span>件
        </router-link>
        <router-link to="javascript:;">
          <i></i>
          <span>成都</span>
        </router-link>
      </div>
      <div class="nav-bottom">
        <nav>
          <ul @click="getAllProduct">
            <li>
              <router-link to="/allProd">
                <span>All Products</span>
                <span>全部产品</span>
              </router-link>
            </li>
            <li>
              <router-link to="/allProd">
                <span>Cake Series</span>
                <span>蛋糕系列</span>
              </router-link>
              <ul class="s-nav">
                <li>
                  <router-link to="/allProd?id=0">经典系列</router-link>
                </li>
                <li>
                  <router-link to="/allProd?id=1">儿童系列</router-link>
                </li>
                <!-- <li>
                  <router-link to="/cakeSeries/list?id=2">真爱系列</router-link>
                </li>-->
                <li>
                  <router-link to="/allProd?id=2">尊爱系列</router-link>
                </li>
              </ul>
            </li>
            <li>
              <router-link to="/allProd?id=3">
                <span>Wagashi</span>
                <span>零食糕点</span>
              </router-link>
            </li>
            <li>
              <router-link to="/about">
                <span>About Us</span>
                <span>关于我们</span>
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="tel">
          <p>
            <i></i>
            <span>400-700-5999</span>
          </p>
        </div>
        <form>
          <router-link to="/about" class="inp"></router-link>
          <input type="text" id="search" @blur="dimServe" ref="dimserve" />
        </form>
      </div>
    </div>
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
  created: function() {
    this.userInfo = this.$store.state.userInfo;
  },
  methods: {
    getAllProduct() {
      this.$store.state.elRow = [];
      if (JSON.stringify(this.$route.query) != "{}") {
        console.log(this.$route.query);
        this.axios
          .post("/product/allProd/list", this.$route.query)
          .then(response => {
            console.log(response.data);
            let temp = [];
            let len = Math.ceil(response.data.length / 3);
            for (let i = 0; i < len; i++) {
              for (let i = 0; i < 3; i++) {
                if (response.data.length != 0) {
                  temp.push(response.data[0]);
                  response.data.shift();
                } else {
                  break;
                }
              }
              this.$store.state.elRow.push(temp);
              temp = [];
            }
            console.log("111", this.$store.state.elRow);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log(this.$route.query);
        this.axios
          .get("/product/allProd")
          .then(response => {
            let temp = [];
            let len = Math.ceil(response.data.length / 3);
            for (let i = 0; i < len; i++) {
              for (let i = 0; i < 3; i++) {
                if (response.data.length != 0) {
                  temp.push(response.data[0]);
                  response.data.shift();
                } else {
                  break;
                }
              }
              this.$store.state.elRow.push(temp);
              temp = [];
            }
            console.log("111", this.$store.state.elRow);
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      // this.$store.commit("increment");

      // axios.get(baseURL,{

      // })
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
      this.$router.push({ path: "/" });
      // this.$router.go(0);
    },
    dimServe: function() {
      console.log(this.$refs.dimserve.value);
      console.log(typeof this.$refs.dimserve.value);
      window.location.href = "./allProd?ser=" + this.$refs.dimserve.value;
      // console.log(window.location.href )
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
li {
  list-style: none;
}

.header {
  width: 996px;
  height: 125px;
  margin: 0 auto;
}
.header .logo {
  float: left;
  margin-top: 30px;
}
.header .nav {
  width: 845px;
  float: right;
}
.header .nav,
.header a {
  color: #6bc4df;
  font-size: 14px;
}
.header .nav-top {
  height: 14px;
  padding-top: 23px;
  margin-bottom: 13px;
}
.header .nav-top a {
  float: right;
  line-height: 14px;
  margin-left: 20px;
  height: 14px;
}
.header .nav-top .unlogin {
  float: right;
  margin-top: -4px;
  margin-left: 11px;
  cursor: pointer;
}
.header .nav-top .username {
  width: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.header .nav-top a i {
  float: left;
  background-size: 100%;
  margin-right: 8px;
}
.header .nav-top a:nth-child(3) i {
  width: 9px;
  height: 14px;
  background-image: url("../static/images/dizhi_icon.png");
}
.header .nav-top a:nth-child(2) i {
  width: 18px;
  height: 14px;
  background-image: url("../static/images/cart_icon.png");
}
.header .nav-bottom nav {
  float: left;
}
.header .nav-bottom ul li {
  width: 163px;
  height: 50px;
  left: 38px;
  float: left;
  text-align: center;
  border-right: 1px solid #6bc4df;
  position: relative;
}
.header .nav-bottom ul li span {
  height: 25px;
  line-height: 25px;
  display: block;
}
.header .nav-bottom ul li:last-child {
  border: 0;
}
.header .nav-bottom ul li:nth-child(2):hover .s-nav {
  display: block;
  z-index: 666;
}
.header .nav-bottom .s-nav {
  width: 125px;
  background-color: #fff;
  left: 20px;
  position: absolute;
  display: none;
}
.header .nav-bottom .s-nav li {
  width: 125px;
  height: 43px;
  line-height: 43px;
  left: 0;
  border: 0;
}
.header .nav-bottom .tel,
.header .nav-bottom form {
  float: right;
  font-size: 12px;
  margin-right: 26px;
}
.header .nav-bottom .tel {
  /* margin-bottom: 6px; */
  /* margin-top: -24px; */
  margin-top: 6px;
}
.header .nav-bottom .tel i {
  width: 15px;
  height: 15px;
  float: left;
  background-image: url("../static/images/phone_icon.png");
  background-size: 100%;
  margin-right: 1px;
}
.header .nav-bottom form {
  margin-top: 2px;
  left: 10px;
  width: 105px;
  height: 22px;
  position: relative;
  border: 1px solid #6bc4df;
}
.header form .inp {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0px;
  top: 0px;
  background-image: url("../static/images/search_icon.png");
  background-size: 100%;
}

.header .nav-bottom form input {
  width: 85px;
  height: 20px;
  float: left;
  margin-left: 20px;
  outline: none;
  border: none;
}
</style>