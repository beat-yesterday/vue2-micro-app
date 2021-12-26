import "./public-path";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
// import routes from "./router";
// import store from "./store";

// const Home = { template: "<p>home page</p>" };

const routes = [
  {
    path: "/",
    component: App,
  },
];

const store = {};

Vue.config.productionTip = false;

let router = null;
let instance = null;
function render(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? "/vue-app/" : "/",
    mode: "history",
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// when run independently
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}
export async function mount(props) {
  console.log("[vue] props from main framework", props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}

// window["vue-app"] = { bootstrap, mount, unmount };
