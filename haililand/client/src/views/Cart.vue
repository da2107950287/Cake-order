<template>
  <div>
    <top-header></top-header>
    <div>
      <div class="hr">
        <h4>购物车</h4>
      </div>
      <div class="cart-box">
        <p class="nobuy" v-if="this.cart.length==0">
          您还没有选购商品，您可以选择以下推荐商品， 也可以
          <router-link to="/">返回首页</router-link>购买。
        </p>
        <div class="cart" v-else>
          <table>
            <thead>
              <tr>
                <th colspan="2">商品名称</th>
                <th>积分</th>
                <th>单价</th>
                <th>购买数量</th>
                <th>小计</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody v-for="(item,index) in this.cart" v-bind:key="index">
              <tr>
                <td>
                  <input
                    name="checkbox"
                    type="checkbox"
                    class="checkA"
                    @change="select(item.pid),getAllMoney() "
                  />
                  <!-- <input name="checkbox" type="checkbox" class="checkA" @change="select(item.pid),getAllMoney() "/> -->
                </td>
                <td>
                  <!-- <img src="#"/> -->
                  <a href="" class="link blue">
                    <span>{{item.pname}}</span>
                  </a>
                </td>
                <td>
                  <span>{{item.ppoint}}</span>
                </td>
                <td>
                  <span>￥{{item.price}}</span>
                </td>
                <td>
                  <div class="sum_cont">
                    <label class="minute" @click="decreaseNum(item.pid) ">-</label>
                    <input class="input" :value="item.count" disabled />
                    <label class="add" @click="increaseNum(item.pid) ">+</label>
                  </div>
                   <!-- <div class="h_shuxz">
                    <a href="javascript:;" @click="changeNumber0">-</a>
                    <input
                      type="text"
                      value="1"
                      @blur="changeNumber2"
                      ref="carouselinp"
                    />
                    <a href="javascript:;" @click="changeNumber1">+</a>
                  </div> -->
                </td>
                <td>
                  <span>￥{{item.count*item.price}}</span>
                </td>
                <td>
                  <router-link
                    to
                    class="delBtn blue"
                    @click.native=" deleteStoreCart(item.pid,index)"
                  >删除</router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            <router-link to="/" class="gobuy">继续购物</router-link>
          </p>
          <div class="mbox">
            <!-- <router-link to class="blue" id="checkAll"  @click.native="selectall()" >全选</router-link>
             <router-link to class="blue" id="checkAll"  ></router-link>
            <router-link
              to="/Cart"
              class="blue"
              id="checkChoose"
              @click.native="deleteStoreCart(product.pid,index)"
            >×删除选中商品</router-link>-->
            <div>
              总计：￥
              <span id="money">{{allmoney}}</span>
              <router-link to="/order" class="next">结算</router-link>
            </div>
          </div>
        </div>
      </div>

      <h4 class="morel">更多精彩</h4>
      <div id="all-item" class="series"></div>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>
 
<script>
import { mapState, mapMutations, mapGetters } from "vuex";
//引入mapState、mapMutations映射函数
export default {
  data() {
    return {
      allmoney: 0,
      // product:"",
      money:0,
      flag1: "block",
      flag2: "none"
    };
  },
  created: function() {},
  updated() {},
  methods: {
    ...mapMutations([
      "increaseNum",
      "decreaseNum",
      "addToCart",
      "deleteStoreCart",
      "select",
      "selectall"
    ]),
    getAllMoney() {
      this.allmoney = this.$store.getters.allMoney;
    },
   
  },
  computed: {
    ...mapGetters(["carList", "allSelsect"]),
    ...mapState({
      disabled: state => state.disabled,
      changableNum: state => state.changableNum //用模块headerStatus里的状态 changableNum
    }),
    cart: function() {
      // console.log("cart: function() {");
      console.log(this.$store.state.cart);
      return this.$store.state.cart;
    }
  },
  components: {}
};
</script>
<style  scoped>
.disabled {
  color: #eee;
}
a {
  text-decoration: none;
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
.cart-box {
  width: 996px;
  margin: 0 auto;
  margin-bottom: 40px;
}
.cart-box .nobuy {
  height: 208px;
  color: #626262;
  font-size: 13px;
  line-height: 208px;
  text-align: center;
}
.cart-box .nobuy a {
  color: #000;
  text-decoration: underline;
}
.cart-box .cart {
  width: 996px;
}
.cart-box .cart .blue {
  color: #626262;
}
.cart-box .cart .blue:hover {
  color: #87d0e3;
  text-decoration: underline;
}
.cart-box .cart table {
  width: 996px;
  color: #626262;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: center;
}
.cart-box .cart table thead {
  height: 27px;
  line-height: 27px;
  font-size: 13px;
  background-color: #ededed;
}
.cart-box .cart table tbody {
  font-size: 14px;
}
.cart-box .cart table tbody tr td {
  height: 75px;
  padding: 5px 0;
  border-bottom: 2px solid #d5d5d5;
}
.cart-box .cart table tbody tr td:nth-child(1) {
  width: 23px;
}
/* .cart-box .cart table tbody tr td input {
  width: 20px;
  height: 20px;
} */
.cart-box .cart table tbody tr td .link {
  height: 65px;
  /* float: left; */
  /* text-align: center; */
  line-height: 65px;
  margin-left: 5px;
}
.cart-box .cart table tbody tr td img {
  width: 65px;
  height: 65px;
  float: left;
}

.minute {
  /* position: absolute; */
  width: 25px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  /* left: 10px; */
  font-size: 18px;
  border: 1px solid #ccc;
  display: inline-block;
  border-right: none;
  cursor: pointer;
}
/*加号*/

.add {
  width: 25px;
  border: 1px solid #ccc;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  display: inline-block;
  border-left: none;
  cursor: pointer;
}
/*文本框*/

.input {
  width: 25px;
  border: 1px solid #ccc;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  text-align: center;
  vertical-align: top;
}
.cart-box .cart table tbody tr td #num {
  color: #000;
}
.cart-box .cart p {
  width: 996px;
  height: 30px;
  margin-bottom: 20px;
}
.cart-box .cart p .gobuy {
  height: 30px;
  color: #6bc4df;
  float: right;
  font-size: 13px;
  line-height: 30px;
  margin-right: 10px;
}
.cart-box .cart p .gobuy:hover {
  text-decoration: underline;
}
.cart-box .cart .mbox {
  width: 996px;
  height: 60px;
}
.cart-box .cart .mbox a {
  color: #626262;
}
.cart-box .cart .mbox #checkAll,
.cart-box .cart .mbox #checkChoose {
  height: 60px;
  float: left;
  line-height: 60px;
  font-size: 13px;
  margin-right: 15px;
}
.cart-box .cart .mbox div {
  width: 230px;
  height: 60px;
  float: right;
  color: #626262;
  line-height: 60px;
  font-size: 16px;
  padding-left: 20px;
  background-color: #ededed;
  border: 1px solid #d5d5d5;
}
.cart-box .cart .mbox div .next {
  height: 30px;
  text-align: center;
  font-size: 14px;
  line-height: 30px;
  float: right;
  padding: 0 15px;
  margin-top: 15px;
  margin-right: 15px;
  background-color: #ff0;
}
.morel {
  width: 996px;
  margin: 0 auto;
  color: #626262;
  font-size: 13px;
  margin-bottom: 10px;
}
</style>