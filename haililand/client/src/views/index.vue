<template>
  <div class="contonter">
    <top-header></top-header>
    <!-- 轮播图 -->
    <el-carousel :interval="30000" arrow="always" @change="carChange" ref="carousel">
      <el-carousel-item v-for="item in shuffling" :key="item.id">
        <img :src="item.src" alt srcset @click="winRef" />
      </el-carousel-item>
    </el-carousel>


  <!-- 图片展示 -->
    <el-row :gutter="20" class="rowNo">
      <el-col :span="8" v-for="(item,index) in imgsUp" :key="index" >
        <div class="grid-content bg-purple">
          <a href="javascript:;" >
            <img
              :src="item"
              alt
              srcset
              class="el-col-img"
            />
          </a>
        </div>
      </el-col>
    </el-row>


<!-- 图片解释 -->
    <el-row :gutter="20">
      <el-col :span="8" v-for="(item,index) in imgExplain" :key="index">
        <div class="grid-content1 bg-purple">
          <a href="javascript:;">
            <p>{{item.p}}</p>
            <label for>{{item.label}}</label>
          </a>
        </div>
      </el-col>
    </el-row>

<!-- 视频 -->
    <el-container>
      <el-aside width="240px" height="420px">
        <img src="http://www.holiland.com/data/afficheimg/1556240157651442682.jpg" alt srcset />
      </el-aside>
      <el-main>
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </el-main>
    </el-container>



<!-- 图片展示 -->
    <el-row :gutter="20" class="rowNo">
      <el-col :span="8" v-for="(item,index) in imgsOn" :key="index">
        <div class="grid-content bg-purple">
          <a href="javascript:;">
            <img
              :src="item"
              alt
              srcset
              class="el-col-img"
            />
          </a>
        </div>
      </el-col>
    </el-row>


<!-- 图片注释 -->
      <el-row :gutter="20">
      <el-col :span="8"  v-for="(item,index) in imgsExplain" :key="index">
        <div class="grid-content1 bg-purple"  >
          <a href="javascript:;">
            <p>{{item.p}}</p>
            <label for>{{item.label}}</label>
          </a>
        </div>
      </el-col>
    </el-row>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";

export default {
  name: "index",
  components: {
    videoPlayer
  },
  data: function() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src:
              "http://cloud.video.taobao.com//play/u/2455221099/p/1/e/6/t/1/50071310842.mp4", // 路径
            type: "video/mp4" // 类型
          }
        ],
        poster:
          "https://img.alicdn.com/imgextra/i2/2455221099/TB2ZMW8hHZnBKNjSZFGXXbt3FXa_!!2455221099.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      shuffling: [
        {
          id: 1,
          src: "http://www.holiland.com/data/afficheimg/1464247474728938268.jpg"
        },
        {
          id: 2,
          src: "http://www.holiland.com/data/afficheimg/1456986961694221493.jpg"
        },
        {
          id: 3,
          src: "http://www.holiland.com/data/afficheimg/1451241729614010049.jpg"
        }
      ],
      imgsUp:[
         "http://www.holiland.com/data/afficheimg/1556050944618701139.jpg",
         "http://www.holiland.com/data/afficheimg/1556053192285643115.jpg",
         "http://www.holiland.com/data/afficheimg/1562625291693904523.jpg"
      ],
      imgExplain: [
        {
          p:"经典系列",
          label:"CLASSIC SERIES"
        },
        {
          p:"店面形象",
          label:"STORE IMAGES"
        },
        {
          p:"配送服务",
          label:"DELIVERY SERVICE"
        }
      ],
      imgsOn: [
        "http://www.holiland.com/data/afficheimg/1528259724147241527.jpg",
        "http://www.holiland.com/data/afficheimg/1458096609174521318.jpg",
        "http://www.holiland.com/data/afficheimg/1458039189338219135.jpg"
      ],
       imgsExplain: [
        {
          p:"配送包",
          label:"CDELIVERY PACKAGE"
        },
        {
          p:"儿童系列",
          label:"CHILDREN SERIES"
        },
        {
          p:"经典系列",
          label:"CLASSIC SERIES"
        }
      ],
    };
  },
  methods: {
    imgChange: function() {
      console.log(this.$refs.carousel.$el);
    },
    carChange: function() {
      // console.log(this.$refs.carousel.$el);
      this.$refs.carousel.$el.style.opacity = "0";
      var carInterval = setInterval(() => {
        this.$refs.carousel.$el.style.opacity =
          Number(this.$refs.carousel.$el.style.opacity) + 0.1;
        if (Number(this.$refs.carousel.$el.style.opacity) >= 1) {
          clearInterval(carInterval);
        }
      }, 50);
    },
    winRef: function(){
         window.location.href = "./allProd"
    }
  },
  created: function() {}
};
</script>
  
<style>
.wer {
  width: 200px;
  height: 20px;
  background-color: #626262;
}
* {
  margin: 0;
  padding: 0;
}
.el-carousel__item img {
  opacity: 0.8;
  transition: all 0.3s ease 0s;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

[class*=" el-icon-"],
[class^="el-icon-"] {
  font-size: 34px;
}
.el-carousel__container .el-carousel__arrow {
  border-radius: 0px;
  width: 42px;
  height: 42px;
}
.el-carousel--horizontal  .el-carousel__container {
  height: 450px;
}
.contonter {
  width: 996px;
  overflow: hidden;
  margin: 0px auto;
}
.el-carousel__indicator .el-carousel__button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #626262;
  opacity: 0.3;
}
.el-carousel {
  margin-bottom: 10px;
}
.el-carousel:hover {
 cursor: pointer;
}




.el-row {
  margin-bottom: 10px;
}
.rowNo {
  margin-bottom: 0;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
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
.grid-content {
  min-height: 220px;
  height: 220px;
  overflow: hidden;
}


.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
 .el-col-img{
  transition: all 0.5s ease 0s;
  width: 325px;
  height: 220px;
}

.el-col-img:hover{
 width: 335px;
 height: 230px;
}





.grid-content1 {
  cursor: pointer;
  height: 50px;
  width: 319px;
  display: inline-block;
}

.grid-content1 a {
  color: #fff;
  text-decoration: none;
  display: block;
  height: 50px;
}
.grid-content1 a p {
  box-sizing: border-box;
  cursor: pointer;
  padding: 0px 0px 0px 15px;
  width: 100%;
  height: 27px;
  line-height: 35px;
}
.grid-content1 a label {
  font-size: 12px;
  padding: 0px 0px 0px 15px;
  cursor: pointer;
}

.el-aside {
  /* background-color: #d3dce6; */
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-aside img {
  width: 240px;
  height: 420px;
}
.el-container{
  height: 450px;
  margin-bottom: -10px;
}
.el-container .el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 2.1px 0 0 20px;
  overflow: hidden;
}
.el-container .el-aside{
  overflow: hidden;
}
.video-js .vjs-tech {
  height: 420px;
  width: 745px;
}
.video-js .vjs-big-play-button {
  height: 1.5em;
  width: 1.5em;
  top: 340px;
  left: 10px;
  background-color: rgba(355, 255, 255, 0);
  border-radius: 50%;
}
</style>