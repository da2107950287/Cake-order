<template>
  <div id="app">
    <!-- <top-head></top-head> -->

<!--    
    <div class="nav">
      <router-link to="/login" class="login">登录</router-link>
      <router-link to="/region" class="login">注册</router-link>
      <router-link to="/text" class="login">测试</router-link>
    </div> -->

    <router-view />
  </div>
</template>

<style lang="scss">
.nav {
  margin: auto;
  width: 996px;
  height: 30px;
  text-align: center;
}
.login {
  text-decoration: none;
  font-size: 24px;
  // font-weight: bolder;
  color: #000;
}
</style>
