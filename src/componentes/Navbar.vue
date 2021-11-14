<template>
  <section class="src-componentes-navbar">
    <nav
      class="navbar navbar-expand-md navbar-dark"
      style="background-color: rgba(206, 34, 77, 0.979)"
    >
      <router-link to="/">
        <a class="navbar-brand" href="#" style="color: white">Inicio</a>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav">
          <li class="nav-item">
            <router-link to="/listaProductos">
              <a class="nav-link" href="#" style="color: white"
                >Lista de precios</a
              >
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/carrito">
              <a class="nav-link" href="#" style="color: white"
                >Carrito de compras</a
              >
            </router-link>
          </li>

          <li class="nav-item">
            <router-link to="/seguimientoPedido">
              <a class="nav-link" href="#" style="color: white"
                >¡Seguí tu pedido!
              </a>
            </router-link>
          </li>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  name: "src-componentes-navbar",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped lang="css">
.src-componentes-navbar {
}
</style>
