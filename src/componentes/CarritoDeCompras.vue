<template>
  <section class="src-componentes-carrito-de-compras">
    <div class="jumbotron">
      <h2>¡Agregá lo que quieras!</h2>
      <hr />
      <br />

      <vue-form :state="formState" @submit.prevent="agregarProductoAlCarrito()">
        <validate tag="div">
          <label for="nombre">Nombre del producto</label>
          <input
            style="width: 500px"
            placeholder="Ingrese el producto"
            type="text"
            id="nombre"
            v-model.trim="formData.nombre"
            name="nombre"
            class="form-control"
            autocomplete="off"
            required
            no-espacios
          />

          <field-messages name="nombre" show="$dirty"> </field-messages>
        </validate>

        <validate tag="div">
          <label for="precio">Precio unitario</label>
          <input
            style="width: 100px"
            type="number"
            id="precio"
            v-model.number="formData.precio"
            name="precio"
            class="form-control"
            autocomplete="off"
            required
          />

          <field-messages name="precio" show="$dirty"> </field-messages>
        </validate>

        <validate tag="div">
          <label for="cantidad">Cantidad</label>
          <input
            style="width: 100px"
            type="number"
            id="cantidad"
            v-model.number="formData.cantidad"
            name="cantidad"
            class="form-control"
            autocomplete="off"
            required
          />

          <field-messages name="cantidad" show="$dirty"> </field-messages>
        </validate>
        <br />

        <button
          class="btn btn-success my-3"
          :disabled="formState.$invalid"
          type="submit"
        >
          Agregar
        </button>
      </vue-form>

      <div class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Producto</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th></th>
          </tr>
          <tr v-for="(producto, index) in carrito" :key="index">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.precio }}</td>
            <td>{{ producto.cantidad }}</td>
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
    this.pedirDatosAlServidor();
  },
  data() {
    return {
      formData: this.getInicialData(),
      formState: {},
      urlCarrito: "https://617498b308834f0017c709b5.mockapi.io/Carrito/",
      carrito: [],
    };
  },
  methods: {
    getInicialData() {
      return {
        nombre: "",
        precio: "",
        cantidad: 0,
      };
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

    agregarProductoAlCarrito() {
      let carrito = {
        nombre: this.formData.nombre,
        precio: this.formData.precio,
        cantidad: this.formData.cantidad,
      };
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
</style>
