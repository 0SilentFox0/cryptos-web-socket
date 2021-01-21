<template>
	<b-table
		class="mt-4"
		striped
		hover
		bordered
		:items="cryptoData"
		:fields="fields"/>
</template>

<script>
export default {
	name: "Grid",
	props: {
		cryptoData: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			fields: [
				{
					key: 'FSYM',
					label: 'Symbol',
					sortable: true,
				},
				{
					key: 'P',
					label: 'Price $',
					sortable: true,
				},
			],
		};
	},
};
</script>

<style scoped>

</style>
