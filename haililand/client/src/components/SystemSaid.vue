<template>
  <div class="saide">
    <el-row class="tac">
      <el-col :span="12" class="saidnav">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo ul"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <span>个人中心</span>
            </template>
            <el-menu-item-group>
              <router-link to="/systemuser" class="a"><el-menu-item index="1-1">用户列表</el-menu-item></router-link>
              <!-- <el-menu-item index="1-2">用户修改</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>
           <el-submenu index="2">
            <template slot="title">
              <span>产品中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">产品列表</el-menu-item>
              <el-menu-item index="2-2">产品添加</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.saidnav {
  width: 19.5%;
  margin-top: -2px;
  height: 580px;
  background-color: rgb(84, 92, 100);
  /* margin-top:-2px;
  padding: 0; */
}
.ul{
    width: 100%;
}
a{
  text-decoration: none;
}
</style>