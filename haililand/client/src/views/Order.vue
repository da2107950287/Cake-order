<template>
  <div class="order">
    <top-header></top-header>
    <div>
      <div class="hr">
        <h4>购物车</h4>
      </div>
      <div class="common">收货信息</div>
      <form class="accpectblock">
        <h3 class="shouhuo">收货人信息</h3>
        <div class="com selectaddress">选择地区</div>
        <div id="app dq">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          ></el-cascader>
        </div>
        <div class="com dz" prop="name">详细地址</div>
        <el-input v-model="address"></el-input>
        <div class="com">收货人姓名</div>
        <el-input v-model="name"></el-input>
        <div class="com">收货人手机号码</div>
        <el-input v-model="tel"></el-input>
        <el-row>
          <el-button class="subbtn" @click.native="baocun">保存收货地址</el-button>
        </el-row>
        <div class="common">收货日期</div>
        <div>
          <div class="block">
            <el-date-picker
              v-model="value2"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
            <!--   onchange="javascript:void(this.value);setBestTime(this);" -->
            <select name="delivertime" class="option">
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
            </select>
            <span class="option" style="line-height:30px">至</span>
            <select style name="delivertime" class="option">
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
            </select>
          </div>
        </div>

        <div class="common">订单详情</div>

        <table>
          <thead>
            <tr>
              <th>名称</th>
              <th>尺寸</th>
              <th>积分</th>
              <th>数量</th>
              <th>小计</th>
            </tr>
          </thead>
          <tbody v-for="(item,index) in this.cart" v-bind:key="index" >
            <tr>
              <td>
                <a href="#" class="link blue">
                  <span>{{item.pname}}</span>
                </a>
                <!-- <img src="product.pimg" alt /> -->
              </td>
              <td>
                <span>{{item.ppoint}}</span>
              </td>
              <td>
                <span>{{item.ppoint}}</span>
              </td>
              <td>
                <span>{{item.count}}</span>
              </td>
              <td>
                <span>￥{{$store.getters.allMoney}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
        <el-row>
          <el-button class="subbtn mysubbtn" @click.native="baocun">确认并提交订单</el-button>
        </el-row>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>
<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  data() {
    return {
      cart: [],
      address: "",
      name: "",
      tel: "",
      options: regionData,
      selectedOptions: [],

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          }
        ]
      },
      value1: "",
      value2: ""
    };
  },
  created() {
    this.cart = this.$store.state.cart;
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    baocun() {
      console.log(this.selectedOptions, this.address, this.name, this.tel);
      // this.selectedOptions = CodeToText this.shortcuts;
      console.log(this.selectedOptions);
      // this.axios
      //   .post("/user/orderinfo", {
      //     selectedOptions: this.selectedOptions,
      //     address: this.address,
      //     name: this.name,
      //     tel: this.tel
      //   })
      //   .then(function(response) {
      //     console.log(response);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    }
  }
};
</script>
<style scoped>
a{
  text-decoration: none;
  color:#626262;
}
.mysubbtn{
  float: right;
}
table {
  width: 996px;
  color: #626262;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: center;
}
table thead {
  height: 27px;
  line-height: 27px;
  font-size: 13px;
  background-color: #ededed;
}
table tbody {
  font-size: 14px;
}
table tbody tr td {
  height: 75px;
  padding: 5px 0;
  border-bottom: 2px solid #d5d5d5;
  text-align: center;
}
/* table tbody tr td:nth-child(1) {
  width: 23px;
} */
/* .cart-box .cart table tbody tr td input {
  width: 20px;
  height: 20px;
} */
table tbody tr td .link {
  height: 65px;
  /* float: left; */
  /* text-align: center; */
  line-height: 65px;
  margin-left: 5px;
}
table tbody tr td img {
  /* width: 65px; */
  /* height: 65px; */
  float: left;
}

.option {
  vertical-align: middle;
  margin-top: 7px;
  margin-left: 2%;
  height: 30px;
}
.block {
  display: flex;
  margin-top: 15px;
  margin-bottom: 10px;
}
.order {
  width: 996px;
  /* height: 125px; */
  margin: 0 auto;
}
.shouhuo {
  margin-top: 10px;
  font-size: 16px;
  color: #87d0e3;
  padding: 0 15px;
  margin-bottom: 12px;
}
.com {
  padding: 0 15px;
  font-size: 15px;
  margin: 5px 0;
  font-size: 13px;
  color: #626262;
}
.el-input {
  width: 400px;
  display: block;
  border-radius: 0px;
}
.hr {
  width: 996px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 28px;
  border-top: 1px dashed #d5d5d5;
  position: relative;
}
.hr h4 {
  width: 97px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #909090;
  background-color: #fff;
  position: absolute;
  left: 50%;
  margin-top: -16px;
  margin-left: -48px;
}
.common {
  border-top: 1px solid #d6d5d5;
  border-bottom: 1px solid #d6d5d5;
  height: 25px;
  line-height: 25px;
  padding: 0 15px;
  font-size: 15px;
  color: #626262;
}
.subbtn {
  background-color: #ff0;
  font-size: 16px;
  color: #626262;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
