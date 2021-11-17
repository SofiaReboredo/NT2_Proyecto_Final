<template>

  <section class="src-componentes-registro">
    
   <div class="jumbotron" :style="{background: colorDeFondo, color: colorDeTexto }">
     <h2><b>{{ darBienvenida() }}</b></h2>
     <br>
      <h3>Registro de usuario</h3>
      <hr />
      <br />
      <vue-form :state="formState" @submit.prevent="enviar()">
          <validate tag="div">
            <label for="nombre">Nombre</label>
            <input 
              type="text" 
              id="nombre" 
              name="nombre" 
              class="form-control"
              autocomplete="off"
              v-model.trim="formData.nombre"
              required
              :minlength="nombreLengthMin"
              :maxlength="nombreLengthMax"
              no-espacios
          >
          <!-- mensajes de validación -->
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>            
            <div slot="no-espacios" class="alert alert-danger mt-1">
              Ingrese sólo el primer nombre.
            </div>            
            <div slot="minlength" class="alert alert-danger mt-1">
              Ingrese al menos {{ nombreLengthMin }} caracteres.
            </div>            
            <div v-if="formData.nombre.length == nombreLengthMax" class="alert alert-warning mt-1">
              Lo sentimos. No puede ingresar más de {{ nombreLengthMax }} caracteres.
            </div>
                        
          </field-messages>
          </validate>
           <br>
          <validate tag="div">
            <label for="apellido">Apellido</label>
            <input 
              type="text" 
              id="apellido" 
              name="apellido" 
              class="form-control"
              autocomplete="off"
              v-model.trim="formData.apellido"
              required
              no-espacios
          >
          <!-- mensajes de validación -->
          <field-messages name="apellido" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>            
            <div slot="no-espacios" class="alert alert-danger mt-1">
              Ingrese su apellido.
            </div>                             
          </field-messages>

        </validate>
        <br>
        <validate tag="div">
          <label for="edad">Edad</label>
          <input
            type="number"
            id="edad"
            name="edad"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.edad"
            required
            :min="edadMin"
            :max="edadMax"
          >
          <field-messages name="edad" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="min" class="alert alert-danger mt-1">
              La edad mínima es de {{ edadMin }} años
            </div>
            <div slot="max" class="alert alert-danger mt-1">
              La edad máxima es de {{ edadMax }} años
            </div>
          </field-messages>  
        </validate>
        <br>
        <validate tag="div">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="form-control"
            autocomplete="off"
            v-model.trim="formData.email"
            required
          >
          <field-messages name="email" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="email" class="alert alert-danger mt-1">Email no válido</div>
          </field-messages>  
        </validate>
        <br>

        <button class="btn btn-info btn-block my-3" :disabled="formState.$invalid" type="submit">Enviar</button>

      </vue-form>
      <br>
      <hr>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-componentes-registro',
    props: ['colorDeFondo','colorDeTexto'],
    mounted () {

    },
    data () {
      return {
        url : 'https://617498b308834f0017c709b5.mockapi.io/usuarios',
        posts : [],
        formData : this.getInicialData(),
        formState : {},
        nombreLengthMin : 3,
        nombreLengthMax : 15,
        edadMin : 18,
        edadMax : 120,
      }
    },
    methods:{
      getInicialData(){
        return{
          nombre: '',
          edad: '',
          email: '',
          estado: true,
        }
      },
      enviar(){
        console.log({...this.formData})
        this.postUsuario()
        this.formData = this.getInicialData()
        this.formState._reset()
      },
      async postUsuario(){
        try{
           let respuesta = await this.axios.post(this.url,this.formData,{'content-type':'application/json'})
           console.log("Usuario creado correctamente",respuesta.data)
        }
        catch(error){
          console.error(error)
        }
      }
      
    },
  }


</script>

<style scoped lang="css">
.src-componentes-registro {
}
.jumbotron {
  background-color: rgba(241, 235, 241, 0.979);
  color: rgba(206, 34, 77, 0.979);
}
.btn {
  background-color: rgba(206, 34, 77, 0.979);
  border: white;
}
</style>
