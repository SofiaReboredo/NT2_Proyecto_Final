import Vue from 'vue'
import VueRouter from 'vue-router'
import CarritoDeCompras from './componentes/CarritoDeCompras.vue'
import SeguimientoPedido from './componentes/SeguimientoPedido.vue'
import ListaProductos from './componentes/ListaProductos.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/carrito' },
        { path: '/carrito', component: CarritoDeCompras },
        { path: '/seguimientoPedido', component: SeguimientoPedido },
        { path: '/listaProductos', component: ListaProductos }
    ]
})
