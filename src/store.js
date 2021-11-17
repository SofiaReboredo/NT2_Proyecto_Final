import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const URL = "https://617498b308834f0017c709b5.mockapi.io/productos/";

export default new Vuex.Store({
    state: {
        productos : []
    },
    actions : {

        async getProductos({commit}) {
            try {
                let {data:productos} = await axios(URL)
                commit('getProductos',productos)
                console.log("Se obtuvieron los productos correctamente.", productos);
            }
            catch (error) {
                commit('getProductos',[])
                console.error("Ocurrió un error y no se pudieron obtener los productos.", error)
            }
        },
    },

    mutations : {

        getProductos(state,productos) {
            state.productos = productos
        },
    },
})
