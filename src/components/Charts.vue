<template>
	<div>
		<h1 v-if="selectedCryptoInfo.FSYM">{{ selectedCryptoInfo.FSYM }} - USD</h1>
		<apexchart width="100%" type="line" :options="chartOptions" :series="series"/>
	</div>
</template>

<script>
export default {
	name: "Charts",
	props: {
		selectedCryptoInfo: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			dataForChart: [],
			series: [{
				data: [0, 0, 0, 0, 0, 0],
			}],
			chartOptions: {
				chart: {
					height: 350,
					type: 'line',
					zoom: {
						enabled: false,
					},
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					curve: 'straight',
					color: 'red',
				},
				grid: {
					row: {
						colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
						opacity: 0.5,
					},
				},
				xaxis: {
					// type: 'datetime',
					categories: [0, 1, 2, 3, 4, 5],
				},
				yaxis: {
					max: 30000,
					min: 0,
				},
			},
		};
	},
	watch: {
		"selectedCryptoInfo.FSYM"() {
			this.series[0].data = [0, 0, 0, 0, 0, 0];
		},
		"selectedCryptoInfo.P"() {
			if (this.selectedCryptoInfo.P) {
				this.series[0].data.shift();
				this.series[0].data.push(this.selectedCryptoInfo.P);
			}
		},
	},
};
</script>

<style scoped>

</style>
