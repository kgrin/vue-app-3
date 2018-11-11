<template>
	<div class="product-list">
		<b-card-group deck>
			<b-card
				v-for="product in products"
				:key="product.id"
				:title="product.name"
				:img-src="product.image"
				:img-alt="product.name"
				img-top
				class="mb-2"
			>
				<p class="card-text">{{product.description}}</p>
				<template slot="footer">
					<b-button
						:disabled="!product.quantity"
						@click="addProductToCart(product.id)"
						:variant="product.quantity ? 'success' : 'danger'"
						class="float-right"
					>
						{{(product.quantity ? product.price : 'Распродано') | currency}}
					</b-button>
				</template>
			</b-card>
		</b-card-group>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
	name: 'ProductList',
	computed: {
		...mapState({
			products: state => state.products
		})
	},
	methods: {
		...mapActions([
			'addProductToCart'
		])
	}
}
</script>
