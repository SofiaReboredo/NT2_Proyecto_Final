<template>
  <div id="app">
    <div class="jumbotron">
      <h1><img src="./assets/banner.png" alt="Tienda ya banner" /></h1>
      <hr />
      <br />
      <Navbar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "./componentes/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  
}
.jumbotron {
  
  background-color: rgba(190, 167, 188, 0.979);
  color: rgb(173, 54, 137);
}
hr {
  background-color: rgb(154, 132, 158, 0.781);
}
img {
  
  width: 500px;
}
h1{
  background-color: rgba(206, 34, 77, 0.979);
}
</style>
