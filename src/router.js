import Vue from 'vue'
import VueRouter from 'vue-router'
import CarritoDeCompras from './componentes/CarritoDeCompras.vue'
import ListaProductos from './componentes/ListaProductos.vue'
import UsuariosRegistrados from './componentes/UsuariosRegistrados.vue'
import Registro from './componentes/Registro.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/carrito' },
        { path: '/carrito', component: CarritoDeCompras },
        { path: '/listaProductos', component: ListaProductos },
        { path: '/usuarios', component: UsuariosRegistrados },
        { path: '/registro', component: Registro },
        { path: '/registro/:colorDeFondo/:colorDeTexto', name: 'registro', component: Registro, props: true },
    ]
})
