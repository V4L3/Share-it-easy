import Vue from 'vue'
import App from './App.vue'
import './style/style.scss'
import VueRouter from 'vue-router'
import Datepicker from 'vuejs-datepicker';
import './firebase';
import VueFire from 'vuefire';
import VueAgile from 'vue-agile'


Vue.use(VueFire);
Vue.use(VueRouter);
Vue.use(VueAgile)


//Components
import timeline from './components/timeline.vue'
import barchart from './components/barchart.vue'
import list from './components/list.vue'
import project from './components/project.vue'
import home from './components/home.vue'
import entryModal from './components/addEntryModal.vue'
import projectModal from './components/addProjectModal.vue'
import userModal from './components/addUserModal.vue'
import authentication from './components/authentication.vue'

import { auth } from './firebase';

Vue.component("timeline", timeline);
Vue.component("barchart", barchart);
Vue.component("list", list);
Vue.component("project", project);
Vue.component("home", home);
Vue.component("entryModal", entryModal);
Vue.component('datepicker', Datepicker);
Vue.component('projectModal', projectModal);
Vue.component('userModal', userModal);
Vue.component('authentication', authentication);

//ROUTES
const routes = [
  {
    path: '/project/:id',
    component: project,
    props: true,
    name: project,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/home',
    component: home,
    name: home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/sign-in',
    component: authentication
  },
  {
    path: '',
    component: authentication
  }

];

const router = new VueRouter({
  routes: routes
})

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    next('/sign-in');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
