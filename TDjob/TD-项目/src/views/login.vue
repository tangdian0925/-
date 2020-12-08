<template>
  <div>
    <div class="username">
      <span class="username1">用户名</span>
      <el-input v-model="username" placeholder="请输入内容"></el-input>
    </div>
    <div class="password">
      <span class="password1">密码</span>
      <el-input
        placeholder="请输入密码"
        v-model="password"
        show-password
      ></el-input>
    </div>
    <div class="loginButton">
      <el-button type="primary" @click="Addinformation">登陆</el-button>
      <el-button
        @click="drawer = true"
        type="primary"
        style="margin-left: 16px;"
      >
        显示
      </el-button>
      <el-drawer
        title="可选用户名"
        :visible.sync="drawer"
        :direction="direction"
      >
        <el-row :gutter="12">
          <el-col>
            <el-card shadow="always">
              <p>管理员</p>
              <p>username: admin</p>
              <p>password: 随意</p>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col>
            <el-card shadow="always">
              <p>部门员工</p>
              <p>username: employee</p>
              <p>password: 随意</p>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col>
            <el-card shadow="always">
              <p>游客</p>
              <p>username: visitor</p>
              <p>password: 随意</p>
            </el-card>
          </el-col>
        </el-row>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { login } from "../Request/login";
import { setStorage } from "../common/utils";
export default {
  data() {
    return {
      username: "",
      password: "",
      drawer: false,
      direction: "rtl"
    };
  },
  methods: {
    async Addinformation() {
      const data = await login({
        username: this.username,
        password: this.password
      });
      if (data) {
        setStorage("admin-user", data);
        this.$router.push({ path: "/admain" });
      }
    }
  }
};
</script>

<style lang="scss">
.username {
  width: 400px;
  display: flex;
  margin-top: 350px;
  margin-left: 500px;
  .username1 {
    width: 80px;
    line-height: 40px;
  }
}
.password {
  width: 400px;
  display: flex;
  margin-top: 20px;
  margin-left: 500px;
  .password1 {
    width: 80px;
  }
}
.loginButton {
  margin-left: 650px;
  margin-top: 40px;
}
.el-drawer {
  outline: none;
}
.el-drawer__header span {
  outline: none;
}
.administrators {
  width: 278px;
  height: 106px;
}
.el-card {
  width: 300px;
  margin-top: 20px;
  margin-left: 70px;
}
</style>
