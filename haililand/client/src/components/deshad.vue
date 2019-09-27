<template>
  <div class="nav2">
    <span class="ld"></span>
    <span class="info">
      <slot></slot>
    </span>
    <span class="rd"></span>
  </div>
</template>
<style scoped>
.nav2 {
  width: 996px;
  height: 30px;
  margin: 44px auto;
}
.ld {
  width: 45%;
  display: inline-block;
  border-top: 1px dashed #d5d5d5;
  height: 5px;
}
.info {
  width: 10%;
  display: inline-block;
  color: #909090;
  font-weight: bold;
  padding: 5px;
  padding: 0 17px;
  box-sizing: border-box;
  font-size: 16px;
}
.rd {
  width: 45%;
  display: inline-block;
  border-top: 1px dashed #d5d5d5;
  height: 5px;
}
</style>
