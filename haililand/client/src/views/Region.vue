<template>
  <div class="region">
    <top-header></top-header>
    <deshad>用户注册</deshad>
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
          <el-input v-model="ruleForm.name" type="text" class="inputbox"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verifycode" class="input" id="mycode">
          <el-input v-model="ruleForm.verifycode" type="text" class="inputbox" id="myint"></el-input>
          <div class="fycode" @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </div>
        </el-form-item>
        <el-form-item label="密 码" prop="passw" class="input">
          <el-input v-model="ruleForm.passw" type="password" class="inputbox"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" class="input">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            class="inputbox"
          ></el-input>
        </el-form-item>
        <el-form-item class="input mybutton">
          <el-button type="primary" @click="submitForm('ruleForm')" class="button mybutton">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
export default {
  name: "codetest",
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请您确认填写您的账号"));
      } else {
        if (/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/gim.test(value) ||  /^1\d{10}$/gim.test(value)) {
          
          callback();
        }else{
          callback(new Error("请您确认填写您的邮箱或手机号"));
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
         if (
          /^(?=.*\d+)(?=.*\W+)(?=.*[a-zA-Z]+).{8,16}$/gim.test(value)
        ) {
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
          callback();
        } else {
          callback(new Error("必须包含数字，字母，特殊字符"));
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.passw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateVerifycode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.identifyCode) {
        console.log("validateVerifycode:", value);
        callback(new Error("验证码不正确!"));
      } else {
        callback();
      }
    };
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      ruleForm: {
        name: "",
        passw: "",
        checkPass: "",
        verifycode: ""
      },
      rules: {
        name: [
          { validator: validateName, trigger: "blur" }
        ],
        passw: [
          { required: true, message: "密码必须6-20位字符", trigger: "blur" },
          { min: 6, max: 20, message: "密码必须6-20位字符", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          {
            required: true,
            message: "请您再次输入密码",
            trigger: "blur"
          }
        ],
        verifycode: [{ validator: validateVerifycode, trigger: "blur" }]
        // identifyCode:[
        //       { validator: validatePass2, trigger: "blur" },
        // ]
      }
    };
  },
  mounted() {
    // this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/user/reg", this.ruleForm)
            .then(response => {
              console.log(response.data.Msg);
              if (response.data.Msg == "注册失败") {
                this.$alert("用户名已存在", "注册失败", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              } else {
                this.$message({
                  message: "恭喜你，注册成功！",
                  type: "success"
                });
                this.$router.push({ path: "/login" });
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
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
  }
};
</script>
<style scoped>
@import url("../css/form.css");

#mycode .el-form-item__content {
  display: flex;
  height: 40px;
  width: 680px;
  justify-content: space-between;
  flex-wrap: nowrap;
  position: relative;
}
.fycode {
  width: 112px;
  height: 38px;
  position: absolute;
  top: 0;
  left: 98px;
}
.s-canvas {
  width: 112px;
  height: 38px;
}
#mycode .el-form-item__content .inputbox {
  width: 88px;
}
#mycode #myint.el-input__inner {
  width: 88px;
  height: 40px;
}
.mybutton {
  width: 310px;
}
</style>