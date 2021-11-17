import Vue from 'vue'

const mixin = {
    methods: {
        darBienvenida() {
            return `¡Bienvenido a Tienda ya!`
        },
    }
}

Vue.mixin(mixin)