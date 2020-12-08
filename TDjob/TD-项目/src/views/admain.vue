<template>
  <div class="main">
    <div>
      <el-container>
        <el-aside width="200px">
          <div>
            <img src="../../image的副本/logo.png" class="logo" />
          </div>
          <el-col :span="12">
            <el-menu default-active="1" class="el-menu-vertical-demo" router>
              <el-menu-item index="/admain/restaurant">
                <i class="el-icon-loading"></i>
                <span slot="title">餐馆</span>
              </el-menu-item>
              <el-menu-item index="/admain/menu">
                <i class="el-icon-ice-cream-round"></i>
                <span slot="title">菜单</span>
              </el-menu-item>

              <el-menu-item index="/admain/order" v-show="isVisitor">
                <i class="el-icon-ship"></i>
                <span slot="title">订单</span>
              </el-menu-item>
            </el-menu>
            <div class="btn-container">
              <el-button type="primary" style="margin-top:400px" @click="out"
                >登出</el-button
              >
            </div>
          </el-col>
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>admin</el-breadcrumb-item>
              <el-breadcrumb-item>{{ routerName }}</el-breadcrumb-item>
            </el-breadcrumb>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import { cleanStorage, getStorage } from "../common/utils";
export default {
  data() {
    return {
      isVisitor: ""
    };
  },
  computed: {
    routerName() {
      return this.$route.name;
    }
  },
  created() {
    this.getRole();
  },

  methods: {
    out() {
      cleanStorage("admin-user");
      this.$router.push({ path: "/login" });
    },
    getRole() {
      let data = getStorage("admin-user").role;
      if (data == "visitor") {
        this.isVisitor = false;
      } else {
        this.isVisitor = true;
      }
    }
  }
};
</script>

<style scss="lang">
* {
  padding: 0;
  margin: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 100vh;
}
.logo {
  color: white;
  width: 60px;
  height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 20px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-menu {
  width: 200px;
}

.btn-container {
  width: 200px;
  display: flex;
  justify-content: center;
}
</style>
