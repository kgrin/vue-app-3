<template>
	<div class="order-list">
		<p v-show="!orders.length"><i>Вы ещё ничего не заказали.</i></p>
		<b-table v-show="orders.length" bordered hover :items="orders" :fields="orderFields">
			<template slot="total" slot-scope="data">
				{{data.value | currency}}
			</template>
			<template slot="show_details" slot-scope="row">
				<b-button size="sm" @click="row.toggleDetails" class="mr-2">
					{{row.detailsShowing ? 'Скрыть' : 'Показать'}} подробности
				</b-button>
			</template>
			<template slot="row-details" slot-scope="row">
				<b-table bordered hover :items="row.item.items" :fields="orderItemsFields">
					<template slot="price" slot-scope="data">
						{{data.value | currency}}
					</template>
					<template slot="itemTotal" slot-scope="data">
						{{data.item.price * data.item.quantity | currency}}
					</template>
				</b-table>
			</template>
		</b-table>
	</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
	name: 'OrderList',
	computed: {
		...mapState({
			orders: state => state.orders
		}),
		orderFields () {
			return {
				id: {
					label: 'Номер заказа',
					sortable: true
				},
				date: {
					label: 'Дата',
					sortable: true
				},
				total: {
					label: 'Сумма',
					sortable: true
				},
				show_details: {
					label: 'Детали заказа'
				}
			}
		},
		orderItemsFields () {
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
	}
}
</script>
