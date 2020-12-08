import Vue from "vue";
import VueRouter from "vue-router";
import admain from "../views/admain.vue";
import Restaurant from "../views/Restaurant.vue";
import Menu from "../views/Menu.vue";
import Order from "../views/order.vue";
import Login from "../views/login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/admain",
    name: "admain",
    // redirect: "/admain/restaurant",
    component: admain,
    children: [
      {
        path: "restaurant",
        name: "Restaurant",
        component: Restaurant
      },
      {
        path: "menu",
        name: "Menu",
        component: Menu
      },
      {
        path: "order",
        name: "Order",
        component: Order
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
