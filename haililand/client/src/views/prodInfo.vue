<template>
  <div>
    <top-header></top-header>

    <div class="prodInfo">
      <div class="prod-uper">
        <div id="pord-left">
          <el-carousel
            :interval="30000"
            arrow="always"
            @change="carChange"
            ref="carouselshift"
            class="el-carousel-new"
          >
            <el-carousel-item v-for="(item,index) in shufflingPro" :key="index">
              <img :src="item" alt srcset class="img1" />
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="right">
          <el-container>
            <el-header style="height: 290px">
              <img
                src="http://www.holiland.com/images/201905/goods_img/1139_P_1557966759224.jpg"
                alt
                srcset
              />
            </el-header>
            <span class="right-span">
              <h2>{{proinfo.pname}}</h2>
              <div class="prod-all">
                <span class="h2-span">￥</span>
                <h2 v-if="prodBuy.length!=0" class="price" ref="pricechange">{{prodBuy[0].price}}</h2>
                <!-- <span  class="h2-span h2-last">.00</span> -->
              </div>
            </span>

            <el-main class="main">
              <dl class="mian-dl h_ss">
                <dt>规格</dt>
                <dd>
                  <span class="dd-span" @mouseenter="hSizechange" @mouseleave="hSizenone">
                    <b ref="selected">请选择</b>
                    <i></i>
                  </span>
                  <div
                    class="h_size"
                    ref="carousel"
                    @mouseenter="hSizechange"
                    @mouseleave="hSizenone"
                  >
                    <p
                      class="select_attr"
                      v-for="(item,index) in prodBuy"
                      :key="index"
                      @click="checkseries(item)"
                    >
                      <label>{{item.spec}}</label>
                      <font>￥{{item.price}}</font>
                    </p>
                  </div>
                </dd>
              </dl>

              <div class="h_ss h_goumai" @click="addCar">
                <a href="javascript:;">加入购物车</a>
              </div>

              <dl class="h_ss number">
                <dt>数量</dt>
                <dd>
                  <div class="h_shuxz">
                    <a href="javascript:;" @click="changeNumber0">-</a>
                    <input
                      type="text"
                      value="1"
                      @blur="changeNumber2"
                      ref="carouselinp"
                    />
                    <a href="javascript:;" @click="changeNumber1">+</a>
                  </div>
                </dd>
              </dl>

              <div class="h_ss h_goumai specol" @click="immediBuy">
                <a href="javascript:;">立即购买</a>
              </div>
            </el-main>
          </el-container>
        </div>
      </div>

      <div class="information">
        <img :src="proinfo.pimginfo" alt srcset />
      </div>
      <bottom-footer></bottom-footer>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data: function() {
    return {
      shufflingPro: [],
      prodBuy: [],
      proinfo: {},
      tempchange: 139,
      productinfo: {}
    };
  },
  methods: {
    carChange: function() {
      // console.log(this.$refs.carouselshift.$el);
      this.$refs.carouselshift.$el.style.opacity = "0";
      var carInterval = setInterval(() => {
        this.$refs.carouselshift.$el.style.opacity =
          Number(this.$refs.carouselshift.$el.style.opacity) + 0.1;
        if (Number(this.$refs.carouselshift.$el.style.opacity) >= 1) {
          clearInterval(carInterval);
        }
      }, 50);
    },
    hSizechange: function() {
      this.$refs.carousel.style.display = "block";
    },
    hSizenone: function() {
      this.$refs.carousel.style.display = "none";
    },
    changeNumber0: function() {
      if (this.$refs.carouselinp.value == 1) {
        this.$refs.carouselinp.value = 1;
      } else {
        this.$refs.carouselinp.value = Number(this.$refs.carouselinp.value) - 1;
        this.$refs.pricechange.innerText =
          Number(this.$refs.pricechange.innerText) - Number(this.tempchange);
      }
    },
    changeNumber1: function() {
      this.$refs.carouselinp.value = Number(this.$refs.carouselinp.value) + 1;
      this.$refs.pricechange.innerText =
        Number(this.$refs.pricechange.innerText) + Number(this.tempchange);
    },
    changeNumber2: function() {
      // console.log(this.tempchange);
      this.$refs.carouselinp.value = Number(this.$refs.carouselinp.value);
      this.$refs.pricechange.innerText =
        Number(this.tempchange) * this.$refs.carouselinp.value;
    },
    checkseries: function(item) {
      this.$refs.selected.innerText = item.spec;
      this.$refs.pricechange.innerText = item.price;
      this.$refs.carousel.style.display = "none";
      this.tempchange = item.price;
      this.$refs.carouselinp.value = 1;
    },
    addCar: function() {
      if (this.$refs.selected.innerText == "请选择") {
        alert("请选择产品规格");
      } else {
       Vue.set(this.productinfo, "count", this.$refs.carouselinp.value);
       
        this.$store.commit("addToCart", this.productinfo);
        console.log(this.productinfo);
        window.location.href = "./Cart";
      }
    },
    immediBuy: function() {
      if (this.$refs.selected.innerText == "请选择") {
        alert("请选择产品规格");
      } else {
        Vue.set(this.productinfo, "count", this.$refs.carouselinp.value);
       
        this.$store.commit("addToCart", this.productinfo);
        console.log(this.productinfo)
        // window.location.href = "./Cart";
      }
    }
  },
  created: function() {
    // console.log(this.$route.query);
    this.axios
      .post("/product/prodInfo", this.$route.query)
      .then(response => {
        this.shufflingPro = response.data[0][0].pimgs.split(",");
        this.proinfo = response.data[0][0];
        this.prodBuy = response.data[1];
        
        this.productinfo = response.data[0][0];
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.prodInfo {
  width: 996px;
  position: relative;
  margin: 10px auto 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.prod-uper {
  display: flex;
  justify-content: space-around;
}
.prodInfo #pord-left {
  width: 485px;
}
#pord-left .el-carousel__item .img1 {
  opacity: 0.8;
  transition: all 0.3s ease 0s;
  margin: 0;
  width: 485px;
  height: 485px;
}

#pord-left .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

#pord-left .el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

#pord-left .el-carousel-new [class*=" el-icon-"],
[class^="el-icon-"] {
  font-size: 25px;
}
#pord-left .el-carousel-new .el-carousel__container .el-carousel__arrow {
  border-radius: 0px;
  width: 25px;
  height: 25px;
  position: absolute;
  top: 458px;
}
#pord-left .el-carousel--horizontal .el-carousel__container {
  height: 472px;
}
#pord-left .el-carousel-new .el-carousel__indicator .el-carousel__button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #626262;
  opacity: 0.3;
}
#pord-left .el-carousel-new {
  margin-bottom: 10px;
  overflow: hidden;
}
#pord-left .el-carousel__container {
  height: 472px;
}

.right {
  width: 485px;
  height: 485px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header img {
  width: 485px;
  height: 290px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.el-container {
  height: 485px;
  margin-bottom: -10px;
}
.el-container .el-header {
  padding: 0;
  margin-bottom: 10px;
}
.el-container h2 {
  overflow: hidden;
  font-size: 20px;
  height: 30px;
  width: 300px;
  color: #2093cc;
}
.el-container .price {
  width: 100px;
  position: absolute;
  top: -13px;
  left: -67px;
}
.el-container .prod-all {
  display: inline-block;
  display: flex;
  justify-content: center;
  position: relative;
}
.el-container .h2-span {
  overflow: hidden;
  font-size: 20px;
  height: 30px;
  width: 30px;
  color: #2093cc;
  position: absolute;
  left: -83px;
  top: -15px;
  font-weight: 600;
}
/* .el-container  .h2-last{
  position: absolute;
     left: -30px;
    top: -25px;
} */

.el-container span {
  display: inline-block;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  height: 42px;
  margin: 0px 0;
  position: relative;
}

ul,
ol,
dl,
dd {
  list-style: none;
}
a {
  text-decoration: none;
}
.right .main {
  overflow: hidden;
  width: 485px;
  position: relative;
  padding: 2.1px 0 0 0px;
  background-color: #fff;
}
.h_ss {
  height: 50px;
  width: 217px;
  background: #87d0e3;
  float: left;
  color: #fff;
  text-align: left;
  padding-left: 20px;
  line-height: 50px;
  font-size: 15px;
}
.mian-dl {
  position: relative;
}
.main dd {
  float: left;
}
.main dt {
  float: left;
}
.main .dd-span {
  cursor: pointer;
  height: 25px;
  width: 158px;
  background: #fff;
  color: #4fa9d7;
  padding-bottom: 0px;
  text-align: left;
  padding-top: 0px;
  padding-left: 9px;
  margin: 13px 0px 0px 5px;
  display: inline-block;
  line-height: 25px;
  padding-right: 3px;
}

.dd-span b {
  font-weight: normal;
}
.main .dd-span i {
  height: 22px;
  width: 12px;
  background: url(http://www.holiland.com/statics/images/bj_1.png) -38px 0px;
  right: 20px;
  position: absolute;
  display: inline-block;
  top: 15px;
}
.main .h_size {
  overflow-y: scroll;
  height: 75px;
  overflow: auto;
  cursor: pointer;
  width: 170px;
  background: #f6f6f6;
  position: absolute;
  text-align: left;
  left: 55px;
  z-index: 3;
  top: 38px;
  display: none;
}
.select_attr {
  overflow: hidden;
  font-size: 12px;
  color: #4fa9d7;
  padding-bottom: 0px;
  padding-top: 0px;
  padding-left: 0px;
  display: block;
  line-height: 24px;
  padding-right: 3px;
}
.select_attr label {
  float: left;
  margin-right: 10px;
  cursor: default;
}
.select_attr font {
  float: right;
  padding-right: 10px;
}
.h_goumai {
  cursor: pointer;
  position: absolute;
  left: 259px;
}
.h_goumai a {
  margin-left: -20px;
  display: inline-block;
  width: 235px;
  color: #fff;
  padding-left: 0px;
  text-align: center;
}

.main .number {
  position: absolute;
  top: 60px;
}
.h_shuxz {
  margin-left: 40px;
  display: inline-block;
}
.h_shuxz a {
  cursor: pointer;
  border-top: #fff 1px solid;
  height: 25px;
  border-right: #fff 1px solid;
  width: 25px;
  vertical-align: middle;
  border-bottom: #fff 1px solid;
  color: #fff;
  text-align: center;
  margin: 0px;
  border-left: #fff 1px solid;
  display: inline-block;
  line-height: 25px;
}
.h_shuxz input {
  border-top-style: none;
  height: 27px;
  width: 27px;
  vertical-align: middle;
  background: #fff;
  border-bottom-style: none;
  color: #4fa9d7;
  text-align: center;
  border-right-style: none;
  border-left-style: none;
  display: inline-block;
  line-height: 27px;
}
.main .specol {
  background: #ffff00;
  position: absolute;
  left: 259px;
  top: 60px;
}
.specol a {
  color: #626262;
}
.information img {
  width: 996px;
  /* position: absolute; */
  /* left: 0;
  top: 500px; */
}
</style>