<template>
  <div class="allProd">
    <top-header></top-header>
    <div class="shift" v-for="(item,index) in elRow" :key="index">
      <el-row :gutter="20" class="el-row1">
        <el-col :span="8" v-for="item1 in item" :key="item1.pid" class="el-col1">
          <div class="grid-content bg-purple grid-content-sed">
            <a href="javascript:;" @click="winhref(item1.pid)">
              <img :src="item1.pimg" alt class="el-col-img1" />
            </a>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8" v-for="item2 in item" :key="item2.pid" class="el-col1">
          <div class="grid-content-up1 bg-purple">
            <a href>
              <p>{{item2.pname}}</p>
              <label>{{item2.pexplain}}</label>
              <b>￥{{item2.price}}</b>
            </a>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20" class="el-row1">
      <el-col :span="8" class="el-col1">
        <div class="grid-content bg-purple grid-content-sed">
          <a href="item.href">
            <img
              src="http://www.holiland.com/images/201609/goods_img/132_G_1474767302110.jpg"
              alt
              class="el-col-img1"
            />
          </a>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8" class="el-col1">
        <div class="grid-content-up1 bg-purple">
          <a href="javascript:;" @click="test">
            <p>特殊补缴款</p>
            <b>￥1.00</b>
          </a>
        </div>
      </el-col>
    </el-row>

    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      elRow: []
    };
  },
  methods: {
    test: function() {
      console.log(this.elRow);
    },
    winhref: function(index) {
      console.log(index);
      window.location.href = "./prodInfo?pid=" + index;
    },
  getInfo: function(){
     this.axios
        .get("/product/allProd")
        .then(response => {
          this.elRow=[]
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
            console.log(1)
            this.elRow.push(temp);
            console.log(this.elRow)
            console.log(1)
            temp = [];
          }
          console.log("111", this.elRow);
        })
        .catch(function(error) {
          console.log(error);
        });
  },
 


    getElRow:function(){
      if (JSON.stringify(this.$route.query) != "{}") {
      this.axios
        .post("/product/allProd/list", this.$route.query)
        .then(response => {
          this.elRow=[]
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
            this.elRow.push(temp);
            temp = [];
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log(this.$route.query);
     this.getInfo();
    }
    },
      getInfoByVal: function(){
        console.log(this.$route.query.ser)
        let serve = {
          serve: this.$route.query.ser
      }

   if (JSON.stringify(this.$route.query) != "{}") {
      this.axios
        .post("/product/allProd/dimSer", serve)
        .then(response => {
          this.elRow=[]
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
            this.elRow.push(temp);
            temp = [];
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      console.log(this.$route.query);
     this.getInfo();
    }

  }
  },
  watch:{
    "$route.query.id":function(){
      console.log("-------id",this.$route.query.id)
      this.getElRow();
    },
    "$route.query.ser":function(){
      console.log("------ser",this.$route.query.ser)
      this.getInfoByVal();
    }
  },

  created: function() {
    console.log(this.elRow);
    if(this.$route.query.ser){
      this.getInfoByVal();
    }else{
    this.getElRow();
    }
  }

};
</script>

<style>
.allProd {
  width: 996px;
  overflow: hidden;
  margin: 0px auto;
}
* {
  margin: 0;
  padding: 0;
}
.shift {
  margin-bottom: 10px;
}
.el-row1 {
  margin-bottom: 0;
}
.el-row1:last-child {
  margin-bottom: 0;
}
.el-col1 {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #87d0e3;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content-sed {
  min-height: 220px;
  height: 220px;
  overflow: hidden;
}
.el-col-img1 {
  transition: all 0.5s ease 0s;
  width: 325px;
  height: 220px;
}

.el-col-img1:hover {
  width: 335px;
  height: 230px;
}

.grid-content-up1 a {
  color: #fff;
  text-decoration: none;
  display: block;
  height: 50px;
}
.grid-content-up1 a p {
  box-sizing: border-box;
  cursor: pointer;
  padding: 0px 0px 0px 15px;
  width: 100%;
  height: 27px;
  line-height: 35px;
}
.grid-content-up1 a label {
  font-size: 12px;
  padding: 0px 0px 0px 15px;
  cursor: pointer;
}

.grid-content-up1 a b {
  cursor: pointer;
  padding-right: 20px;
  vertical-align: middle;
  color: #fff;
  overflow: hidden;
  display: inline-block;
  width: 80px;
  float: right;
  height: 20px;
  font-size: 13px;
  text-align: right;
}
</style>