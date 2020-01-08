import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import App from "./App.vue";
import DomainList from "@/components/DomainList.vue";
import DomainView from "@/components/DomainView.vue";

import store from './store'

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
	mode: "history",
	routes: [
		{
			path: "/domains",
			component: DomainList
		},
		{
			path: "/domains/:domain",
			component: DomainView,
			props: true
		},
		{
			path: "/",
			redirect: "/domains"
		}
	]
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
