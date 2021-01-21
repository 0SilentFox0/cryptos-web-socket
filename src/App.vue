<template>
	<div id="app">
		<NavBar/>
		<b-container fluid class="bv-example-row">
			<b-row class="justify-content-center align-items-baseline">
				<b-col md="12" lg="2">
					<CryptoList @select-crypto="selectedSymbol = $event"/>
				</b-col>
				<b-col md="12" lg="9">
					<b-row>
						<b-col md="12" lg="6">
							<Grid :crypto-data="cryptoData"/>
						</b-col>
						<b-col md="12" lg="6">
							<Charts :selected-crypto-info="cryptoItem"/>
						</b-col>
					</b-row>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import CryptoList from "@/components/CryptoList";
import Grid from "@/components/Grid";
import Charts from "@/components/Charts";
import NavBar from "@/components/NavBar";
import CRYPTOS, {
	connect as connectToExchange,
	subscribe as subscribeToUpdates,
} from "@/service/exchange";

export default {
	name: 'App',
	components: {
		NavBar,
		Charts, Grid, CryptoList,
	},
	data() {
		return {
			selectedSymbol: "",
			cryptoData: [],
			cryptoItem: {},
		};
	},
	mounted() {
		let symbols = [];
		for (let key in CRYPTOS) {
			symbols.push(key);
		}
		connectToExchange(symbols);
		subscribeToUpdates(this.updatePrice);
	},
	watch: {
		cryptoData: {
			deep: true,
			handler() {
				this.cryptoItem = this.cryptoData.find((item) =>
					item.FSYM === this.selectedSymbol) || {};
			},
		},
	},
	methods: {
		updatePrice(coinInfo) {
			const {FSYM, P} = coinInfo;
			let updateCoin = {
				FSYM, P, _cellVariants: {P: ''},
			};

			if (FSYM && P) {
				let findEl = this.cryptoData.find((el) => el.FSYM === FSYM);
				if (findEl) {
					if (findEl.P > P) {
						findEl._cellVariants.P = 'danger';
					} else if (findEl.P < P) {
						findEl._cellVariants.P = 'success';
					} else findEl._cellVariants.P = '';
					findEl.P = P;
				} else {
					this.cryptoData.push(updateCoin);
				}
			}
		},
	},
};
</script>
