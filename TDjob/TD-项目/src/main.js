import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
Vue.component("v-chart", ECharts);

Vue.config.productionTip = false;
Vue.use(ElementUI);

/* 权限 */
import { getStorage } from "./common/utils";
import _ from "lodash";
Vue.prototype.$permission = function() {
  const role = _.get(getStorage("admin-user"), "role", "");

  if (role !== "admin") {
    return true;
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
