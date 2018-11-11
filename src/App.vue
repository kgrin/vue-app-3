<template>
  <div class="container">
	  	<b-navbar toggleable="md" type="dark" variant="info">
			<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
			<b-navbar-brand href="#">Самый лучший магазин</b-navbar-brand>
			<b-collapse is-nav id="nav_collapse">
				<b-navbar-nav>
					<b-nav-item to="/" exact>Главная</b-nav-item>
					<b-nav-item to="/orders">Мои заказы</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
	  	</b-navbar>
		<router-view class="p-3"></router-view>
	</div>
</template>

<script>
export default {
	name: 'app',
	created () {
		this.$store.dispatch('setProducts')
	}
}
</script>
