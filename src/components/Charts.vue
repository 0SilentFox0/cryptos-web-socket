<template>
	<div>
		<h1 v-if="selectedCryptoInfo.FSYM">{{ selectedCryptoInfo.FSYM }} - USD</h1>
		<trend
			:data="dataForChart"
			:gradient="['#6fa8dc', '#42b983', '#2c3e50']"
			auto-draw
			smooth
		>
		</trend>
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
			// 	series: [{
			// 		data: [0,0,0,0,0,0],
			// 	}],
			// 	chartOptions: {
			// 		chart: {
			// 			animations: {
			// 				enabled: true,
			// 				easing: "linear",
			// 				dynamicAnimation: {
			// 					speed: 1000,
			// 				},
			// 			},
			// 			toolbar: {
			// 				show: false,
			// 			},
			// 			zoom: {
			// 				enabled: false,
			// 			},
			// 		},
			// 		dataLabels: {
			// 			enabled: false,
			// 		},
			// 		stroke: {
			// 			curve: "smooth",
			// 		},
			// 		markers: {
			// 			size: 0,
			// 		},
			// 		xaxis: {
			// 			// type: "datetime",
			// 			// range: 777600000,
			// 			categories: [0, 1, 2, 3, 4, 5],
			// 		},
			// 		yaxis: {
			// 			max: 1000,
			// 		},
			// 		legend: {
			// 			show: false,
			// 		},
			// 	},
		};
	},
	watch: {
		// "selectedCryptoInfo.FSYM"() {
		// 	this.series[0].data = [0, 0, 0, 0, 0, 0];
		// },
		// "selectedCryptoInfo.P"() {
		// 	if (this.selectedCryptoInfo.P) {
		// 		this.series[0].data.shift();
		// 		this.series[0].data.push(this.selectedCryptoInfo.P);
		// 	}
		// }
		"selectedCryptoInfo.FSYM"() {
			this.dataForChart = [];
		},
		"selectedCryptoInfo.P"() {
			if (this.selectedCryptoInfo.P) {
				// this.dataForChart.shift();
				this.dataForChart.push(this.selectedCryptoInfo.P);
			}
		},
	},
};
</script>
