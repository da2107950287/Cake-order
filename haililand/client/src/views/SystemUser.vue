<template>
  <div class="system">
    <system-head></system-head>
    <div class="con">
      <system-said></system-said>
      <div class="main">
        <h3>用户信息列表</h3>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="uid" label="用户id" width="125"></el-table-column>
          <el-table-column prop="tel" label="用户名" width="125"></el-table-column>
          <el-table-column prop="passwd" label="密码" width="125"></el-table-column>
          <el-table-column prop="regtime" label="注册日期" width="150"></el-table-column>
          <el-table-column prop="admin" label="管理员" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" size="small">删除</el-button>
              <el-button @click.native.prevent="editRow(scope.$index, tableData)" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  created: function() {
    this.axios
      .get("/user/userlist", this.ruleForm)
      .then(response => {
        console.log(response);
        // response.data.regtime= response.data.regtime.substring(0,11)
        console.log(response.data);
        response.data.forEach(el => {
          console.log(el.regtime);
          el.regtime = el.regtime.substring(0, 10);
          if (el.admin == 0) {
            el.admin = "非管理员";
          } else {
            el.admin = "管理员";
          }
       
        });
        this.tableData = response.data;
      })
      .catch(err => {
        console.log(err);
      });
      Location.reload()
  },
  methods: {
    deleteRow(index, rows) {
      console.log(this.tableData[index]);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(rows);
          let uid = this.tableData[index].uid;
          console.log(uid);
          this.axios
            .post("/user/userdel", { uid: uid })
            .then(response => {
              console.log(response);
              rows.splice(index, 1);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editRow(index, rows) {
      console.log(this.tableData[index].uid);
      var uid =this.tableData[index].uid
      this.$router.push({name:'systemeaduser',params:{uid:uid}})
    }
  }
};
</script>
<style scoped>
.con {
  position: relative;
}
.main {
  position: absolute;
  left: 20%;
  top: 0;
}
</style>