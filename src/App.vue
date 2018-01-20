<template>
  <div id="app">

    <router-view>     
      
    </router-view>

  </div>
</template>

<script>
window.json = require("./data/projects.json");



export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>
