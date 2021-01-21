<template>
	<b-row>
		<b-col
			cols="12"
			v-for="(crypto, index) in cryptos"
			:key="crypto + index">
			<b-button
				@click="$emit('select-crypto', index)"
				block
				class="px-3 py-2 mt-2">
				{{ crypto }}
			</b-button>
		</b-col>
	</b-row>
</template>

<script>
import CRYPTOS from "@/service/exchange";

export default {
	name: "CryptoList",
	data() {
		return {
			cryptos: CRYPTOS,
		};
	}
};
</script>

<style scoped>

</style>
