<template>
	<div class="home">
		<ProductList/>
		<hr>
		<ShoppingCart/>
	</div>
</template>

<script>
import ProductList from './ProductList.vue'
import ShoppingCart from './ShoppingCart.vue'

export default {
	name: 'Home',
	components: {
		ProductList,
		ShoppingCart
	}
}
</script>
