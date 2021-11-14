<template>
  <section class="src-componentes-lista-productos">
    <div class="jumbotron">
      <h2>Lista de productos en stock</h2>
      <hr />
      <br />
      <button class="btn btn-danger mr-3" @click="getProductos()">
        VER LISTA DE PRODUCTOS
      </button>

      <br />
      <br />
      <br />
      <div class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Nombre del producto</th>
            <th>Precio unitario</th>
          </tr>
          <tr v-for="(producto, index) in $store.state.productos" :key="index">
            <td>{{ producto.nombre }}</td>
            <td>$ {{ producto.precio }}</td>
          </tr>
        </table>
      </div>
    </div>
    <br />
  </section>
</template>

<script>
export default {
  name: "src-componentes-lista-productos",
  props: [],
  mounted() {},
  data() {
    return {
       urlProductos: "https://617498b308834f0017c709b5.mockapi.io/productos/",
      productos: [],
    };
  },
  methods: {
    getProductos() {
      this.$store.dispatch('getProductos')
      // try {
      //   let respuesta = await this.axios(this.urlProductos);
      //   let productos = respuesta.data;
      //   console.log("Se obtuvieron los productos correctamente.", productos);
      //   this.productos = productos;
      // } catch (error) {
      //   console.error("Ocurrió un error y no se pudieron obtener los productos.", error);
      // }
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
.src-componentes-lista-productos {
}
.jumbotron {
  background-color: rgba(241, 235, 241, 0.979);
  color: rgba(206, 34, 77, 0.979);
}
hr {
  background-color:  rgba(206, 34, 77, 0.979);
}
table,
th {
  background-color:  rgba(218, 98, 128, 0.979);
  border: 1px solid rgba(206, 34, 77, 0.979);
}
td {
  background-color:  rgba(211, 193, 197, 0.979);
  border: 1px solid  rgba(206, 34, 77, 0.979);
  color: white;
}
</style>
