<template>
  <section class="src-componentes-carrito-de-compras">
    <div class="jumbotron">
      <h2>¡Agregá lo que quieras!</h2>
      <hr />
      <br />

      <div class="d-flex align-content-around flex-wrap">
        <div
          class="
            media
            alert alert-success
            col-4 col-sm-4 col-md-3 col-lg-2
            mb-3 mb-3
          "
          v-for="(producto, index) in productos"
          :key="index"
        >
          <div class="media-body ml-3">
            <h4>
              <p>{{ producto.nombre }}</p>
            </h4>
            <br />
            <p>
              Precio: $<i>{{ producto.precio }}</i>
            </p>

            <vue-form :state="formState">
              <validate tag="div">
                Cantidad
                <input
                  style="width: 70px"
                  type="number"
                  id="cantidad"
                  v-model.number="formData.cantidad"
                  name="cantidad"
                  class="form-control"
                  autocomplete="off"
                />
              </validate>
            </vue-form>
            <div>
              <br />
              <button
                class="btn btn-secondary ml-3"
                :disabled="formState.$invalid"
                @click="agregarProductoAlCarrito(index)"
              >
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Producto</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Importe</th>
            <th></th>
          </tr>
          <tr v-for="(producto, index) in carrito" :key="index">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.precio }}</td>
            <td>{{ producto.cantidad }}</td>
            <td>$ {{ parseFloat(producto.importe).toFixed(2) }}</td>
            <td>
              <button
                class="btn btn-danger mr-3"
                @click="eliminarProductoDelCarrito(producto.id)"
              >
                ELIMINAR
              </button>
            </td>
          </tr>
        </table>
      </div>
      <table class="table table-dark">
        <tr>
          <th>Compra total</th>
          <th>$ {{ parseFloat(compraTotal).toFixed(2) }}</th>
        </tr>
      </table>
      <br />
      <br />
      <br />
    </div>
    <br />
  </section>
</template>

<script>
export default {
  name: "src-componentes-carrito-de-compras",
  props: [],
  mounted() {
    this.getProductos();
    this.pedirDatosAlServidor();
    this.obtenerProductosDelCarrito();
  },
  data() {
    return {
      formData: this.getInicialData(),
      formState: {},
      urlCarrito: "https://617498b308834f0017c709b5.mockapi.io/Carrito/",
      carrito: [],
      urlProductos: "https://617498b308834f0017c709b5.mockapi.io/productos/",
      productos: [],
      compraTotal: 0,
    };
  },
  methods: {
    getInicialData() {
      return {
        nombre: "",
        precio: "",
        cantidad: 0,
        importe: "",
      };
    },

    getTotalCompra() {
      let total = 0;
      this.carrito.forEach((producto) => {
        total += producto.importe;
      });
      return total;
    },

    async enviarDatosAlServidor(carrito) {
      try {
        let respuesta = await this.axios.post(this.urlCarrito, carrito, {
          "content-type": "application/json",
        });
        let datosRecibidos = respuesta.data;
        console.log("Datos recibidos POST", datosRecibidos);

        this.carrito.push(datosRecibidos);
      } catch (error) {
        console.error("Error en envio de datos del formulario");
      }
    },

    async pedirDatosAlServidor() {
      try {
        let respuesta = await this.axios(this.urlCarrito);

        let carrito = respuesta.data;
        console.log("Datos GET", carrito);
        this.carrito = carrito;
      } catch (error) {
        console.error("Error en recepción de datos del servidor");
      }
    },

    agregarProductoAlCarrito(index) {
      let carrito = {
        nombre: this.productos[index].nombre,
        precio: this.productos[index].precio,
        importe: this.productos[index].precio * this.formData.cantidad,
        cantidad: this.formData.cantidad,
      };
      this.compraTotal = this.getTotalCompra();
      console.log(carrito);
      this.enviarDatosAlServidor(carrito);

      this.formData = this.getInicialData();
      this.formState._reset();
    },

    async obtenerProductosDelCarrito() {
      try {
        let respuesta = await this.axios(this.urlCarrito);
        let carrito = respuesta.data;
        console.log("Se obtuvieron los productos correctamente.", carrito);
        this.carrito = carrito;
        this.compraTotal = this.getTotalCompra();
      } catch (error) {
        console.error(
          "Ocurrió un error y no se pudieron obtener los productos.",
          error
        );
      }
    },

    async eliminarProductoDelCarrito(id) {
      console.log("deleteProducto", id);

      try {
        let respuesta = await this.axios.delete(this.urlCarrito + id);
        let productoEliminado = respuesta.data;
        console.log(
          "El producto ha sido removido exitosamente.",
          productoEliminado
        );

        this.obtenerProductosDelCarrito();
      } catch (error) {
        console.error("Error al eliminar el producto.", error);
      }
    },

    async getProductos() {
      // this.$store.dispatch('getProductos')
      try {
        let respuesta = await this.axios(this.urlProductos);
        let productos = respuesta.data;
        this.productos = productos;
      } catch (error) {
        console.error(
          "Ocurrió un error y no se pudieron obtener los productos.",
          error
        );
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
.src-componentes-carrito-de-compras {
}
.jumbotron {
  background-color: rgba(241, 235, 241, 0.979);
  color: rgba(206, 34, 77, 0.979);
}
hr {
  background-color: rgba(206, 34, 77, 0.979);
}
table,
th {
  background-color: rgba(218, 98, 128, 0.979);
  border: 1px solid rgba(206, 34, 77, 0.979);
}
td,
tr {
  background-color: rgba(211, 193, 197, 0.979);
  border: 1px solid rgba(206, 34, 77, 0.979);
  color: white;
}
.media {
  background-color: rgba(226, 139, 161, 0.979);
  color: white;
}
.btn {
  background-color: rgba(206, 34, 77, 0.979);
  border: white;
}
</style>
