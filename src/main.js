import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'

import App from './App.vue'
import Home from './components/Home.vue'
import OrderList from './components/OrderList.vue'

Vue.config.devtools = true
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BootstrapVue)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/orders',
			component: OrderList
		}
	]
})

const store = new Vuex.Store({
	state: {
		products: [],
		cart: [],
		orders: []
	},
	getters: {
		cartItems (state) {
			return state.cart.map(v => {
				const product = state.products.find(product => v.id === product.id)
				return {
					id: product.id,
					name: product.name,
					price: product.price,
					quantity: v.quantity,
					leftInStock: product.quantity
				}
			})
		},
		cartTotal (state, getters) {
			return getters.cartItems.reduce((total, v) => total + v.price * v.quantity, 0)
		}
	},
	mutations: {
		setProducts (state, products) {
			state.products = products
		},
		incrementInventoryItemQuantity (state, productId) {
			state.products.find(v => v.id === productId).quantity++
		},
		decrementInventoryItemQuantity (state, productId) {
			state.products.find(v => v.id === productId).quantity--
		},
		addProductToCart (state, productId) {
			state.cart.push({
				id: productId,
				quantity: 1
			})
		},
		removeProductFromCart (state, productId) {
			state.cart = state.cart.filter(v => v.id !== productId)
		},
		incrementCartItemQuantity (state, productId) {
			state.cart.find(v => v.id === productId).quantity++
		},
		decrementCartItemQuantity (state, productId) {
			state.cart.find(v => v.id === productId).quantity--
		},
		clearCart (state) {
			state.cart = [];
		},
		addOrder (state, payload) {
			state.orders.push({
				id: state.orders.length + 1,
				date: new Date().toISOString().split('T')[0],
				items: payload.items,
				total: payload.total
			})
		}
	},
	actions: {
		setProducts ({commit}) {
			// setTimeout(() => {
				axios
					.get('/products.json')
					.then(response => {
						commit('setProducts', response.data)
					})
					.catch(error => console.log(error))
			// }, 500)
		},
		addProductToCart ({commit, state}, productId) {
			// setTimeout(() => {
				let product = state.products.find(v => v.id === productId)
				if (product.quantity) {
					let cartItem = state.cart.find(v => v.id === productId)

					commit('decrementInventoryItemQuantity', productId)
					if (!cartItem) {
						commit('addProductToCart', productId)
					} else {
						commit('incrementCartItemQuantity', productId)
					}
				}
			// }, 500)
		},
		removeProductFromCart ({commit, state}, productId) {
			// setTimeout(() => {
				let cartItem = state.cart.find(v => v.id === productId)

				if (cartItem.quantity > 1) {
					commit('decrementCartItemQuantity', productId)
				} else {
					commit('removeProductFromCart', productId)
				}
				commit('incrementInventoryItemQuantity', productId)
			// }, 500)
		},
		checkout ({commit, getters}) {
			commit('addOrder', {
				items: getters.cartItems.map(v => {
					delete v.leftInStock
					return v
				}),
				total: getters.cartTotal
			})
			commit('clearCart')
			router.push('/orders')
		}
	}
})

Vue.filter('currency', function (value, currency, decimals) {
	let v = parseFloat(value)
	if (!isFinite(v) || (!v && v !== 0)) return value
	currency = currency != null ? currency : '$'
	decimals = decimals != null ? decimals : 2
	let stringified = Math.abs(v).toFixed(decimals)
	let _int = decimals
		? stringified.slice(0, -1 - decimals)
		: stringified
	let i = _int.length % 3
	let head = i > 0
		? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
		: ''
	let _float = decimals
		? stringified.slice(-1 - decimals)
		: ''
	let sign = v < 0 ? '-' : ''
	return sign + currency + head +
		_int.slice(i).replace(/(\d{3})(?=\d)/g, '$1,') +
		_float
})

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
