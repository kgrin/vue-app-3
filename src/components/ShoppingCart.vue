<template>
	<div class="shopping-cart">
		<p v-show="!items.length"><i>Пожалуйста, добавьте что-нибудь в корзину.</i></p>
		<b-table v-show="items.length" bordered hover :items="items" :fields="fields">
			<template slot="price" slot-scope="data">
				{{data.value | currency}}
			</template>
			<template slot="quantity" slot-scope="data">
				<b-button 
					@click="removeProductFromCart(data.item.id)"
					variant="danger"
				>-</b-button> {{data.value}} <b-button
					:disabled="!data.item.leftInStock"
					@click="addProductToCart(data.item.id)"
					variant="success"
				>+</b-button>
			</template>
			<template slot="itemTotal" slot-scope="data">
				{{data.item.price * data.item.quantity | currency}}
			</template>
		</b-table>
		<div v-show="items.length" class="float-right mb-2">
			<h2>Всего: {{total | currency}}</h2>
			<b-button @click="checkout" variant="success" class="float-right">Оформить заказ</b-button>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
	name: 'ShoppingCart',
	computed: {
		...mapGetters({
			items: 'cartItems',
			total: 'cartTotal'
		}),
		fields () {
			return {
				name: {
					label: 'Название товара',
					sortable: true
				},
				price: {
					label: 'Цена',
					sortable: true
				},
				quantity: {
					label: 'Количество',
					sortable: true
				},
				itemTotal: {
					label: 'Сумма'
				}
			}
		}
	},
	methods: {
		...mapActions([
			'addProductToCart',
			'removeProductFromCart',
			'checkout'
		])
	},
}
</script>
