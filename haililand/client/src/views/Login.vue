<template>
  <div class="login">
    <top-header></top-header>
    <deshad>用户登录</deshad>
    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm myfrom"
        hide-required-asterisk="true"
      >
        <el-form-item label="用户名" prop="name" class="input">
          <el-input v-model="ruleForm.name" type="text" placeholder="手机|邮箱" class="inputbox"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="passw" class="input">
          <el-input
            v-model="ruleForm.passw"
            type="password"
            placeholder="请输入6-20位字符"
            class="inputbox"
          ></el-input>
        </el-form-item>
        <el-form-item class="input mybutton">
          <el-button type="primary" @click="submitForm('ruleForm')" class="button">登录</el-button>
          <el-button @click="resetForm('ruleForm')">免费注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
      ruleForm: {
        name: "",
        passw: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请您确认填写您的邮箱或手机号",
            trigger: "blur"
          }
        ],
        passw: [
          { required: true, message: "密码必须6-20位字符", trigger: "blur" },
          { min: 6, max: 20, message: "密码必须6-20位字符", trigger: "blur" }
        ]
      }
    };
  },
  
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/user/login", this.ruleForm)
            .then(response => {
              console.log(response);
              let username = JSON.parse(response.config.data).name;
              let admin = response.data.admin
              console.log(admin);
              this.$store.commit("setUserInfo", username); //同步
              if(admin==0){
                this.$router.push({ path: "/" });
              }else{
                this.$router.push({ path: "/system" });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
@import url("../css/form.css");
</style>
