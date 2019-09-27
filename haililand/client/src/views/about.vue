<template>
<div class="about">
    <top-header></top-header>
    <div class="about-cont">
        <div class="about_bt">
            <span class="ab_left ab_span"></span>
            <span class="ab_center">关于我们</span>
            <span class="ab_right ab_span"></span>
        </div>
        <img src="http://www.holiland.com/images/upload/images/20181210/1544409927136109.jpg" alt="" srcset="">
    </div>
    <bottom-footer></bottom-footer>
    <!-- <img src="" alt="" srcset=""> -->
</div>
</template>

<script>

</script>

<style scoped>

.about {
        width: 996px;
    margin: 0px auto;
    overflow: hidden;
}
.about-cont{
        margin-top: 0px;
    /* float: left; */
}
.about_bt{
        text-align: center;
    padding-left: 0;
    width: 996px;
    background: #fff;
    line-height: 30px;
    height: 30px;
    margin-bottom: 10px;
}
.ab_left{
        float: left;
}
.ab_center{
        width: 15%;
    display: inline-block;
    color: #909090;
    font-weight: bold;
    font-size: 16px;
}
.ab_span{
  width: 40%;
    display: inline-block;
    border-top: 1px dashed #d5d5d5;
    margin-top: 14px;
}
.ab_right{
    float: right;
  
}
</style>