<template>
  <section class="src-componentes-usuarios-registrados">
    <div class="jumbotron">
      <h2>Usuarios registrados</h2>
      <hr />
      <br />
      <h4 class="alert alert-secondary">
        <span v-if="calcularUsuariosActivos.ninguno"
          >Ningun usuario está activo</span
        >
        <span v-else-if="calcularUsuariosActivos.todos"
          >Todos los usuarios están activos</span
        >
        <span v-else>
          {{ calcularUsuariosActivos.cantidad }} de
          {{ calcularUsuariosActivos.total }} usuarios
          {{ calcularUsuariosActivos.uno ? "está" : "están" }} activos en el
          sistema.
        </span>
      </h4>
      <button class="btn btn-success mr-2" @click="irACrearUsuario()">
        Nuevo
      </button>
      <br />
      <br />
      <div class="table-responsive">
        <table class="table table-dark">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Estado</th>
            <th style="text-align: center; vertical-align: middle">
              Inactivar/activar
            </th>
          </tr>
          <tr v-for="(usuario, index) in usuarios" :key="index">
            <td>{{ usuario.nombre }}</td>
            <td>{{ usuario.apellido }}</td>
            <td>{{ usuario.email }}</td>
            <td>{{ usuario.edad }}</td>
            <td>{{ usuario.estado ? "Activo" : "Inactivo" }}</td>
            <td style="text-align: center; vertical-align: middle">
              <input
                type="checkbox"
                v-model="usuario.estado"
                style="margin-left: auto; margin-right: auto"
              />
            </td>
            <button
              class="btn btn-warning mr-3"
              @click="putUsuario(usuario.id)"
            >
              EDITAR
            </button>
            <button
              class="btn btn-danger mr-3"
              @click="deleteUsuario(usuario.id)"
            >
              QUITAR
            </button>
          </tr>
        </table>
      </div>
    </div>
    <br />
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-componentes-usuarios-registrados',
    props: [],
    mounted () {
      this.getUsuarios()
    },
    data () {
      return {
        urlUsuarios: "https://617498b308834f0017c709b5.mockapi.io/usuarios/",
      usuarios: [],
      }
    },
    methods: {
            irACrearUsuario() {
        console.log('irACrearUsuario')
        this.$router.push({
          path: '/registro/rgba(211, 193, 197, 0.979)/white'
        })
      },

          async getUsuarios() {
      try {
        let respuesta = await this.axios(this.urlUsuarios);
        let usuarios = respuesta.data;
        console.log("Los usuarios se obtuvieron correctamente", usuarios);
        this.usuarios = usuarios;
      } catch (error) {
        console.error("Error al obtener usuarios", error);
      }
    },

    async putUsuario(id) {
      console.log("putUsuario", id);

      let usuario = {
        nombre: "Daiana",
        apellido: "Macias",
        email: "dai.macias@gmail.com",
        edad: "20",
        estado: true,
      };

      try {
        let respuesta = await this.axios.put(this.urlUsuarios + id, usuario, {
          "content-type": "application/json",
        });
        let usuarioActualizado = respuesta.data;
        console.log("AXIOS PUT USUARIO", usuarioActualizado);

        this.getUsuarios();
      } catch (error) {
        console.error("ERROR AXIOS PUT USUARIO", error);
      }
    },

    async deleteUsuario(id) {
      console.log("deleteUsuario", id);

      try {
        let respuesta = await this.axios.delete(this.urlUsuarios + id);
        let usuarioEliminado = respuesta.data;
        console.log("AXIOS DELETE USUARIO", usuarioEliminado);

        this.getUsuarios();
      } catch (error) {
        console.error("ERROR AXIOS DELETE USUARIO", error);
      }
    },
    },
    computed: {
      calcularUsuariosActivos() {
            let cant = 0
            this.usuarios.forEach(usuario => {
                if(usuario.estado) cant++
            })
            return {
                cantidad : cant,
                total: this.usuarios.length,
                ninguno: cant == 0,
                todos: cant == this.usuarios.length,
                uno: cant == 1
            }
        }
    }
}


</script>

<style scoped lang="css">
.src-componentes-usuarios-registrados {
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
