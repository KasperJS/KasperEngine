<template>
<div>
	<h5>KASPERRRR</h5>
	<v-layout>
		<v-flex xs12 sm2>
			<v-text-field v-model.number="Collvo" label="Количество" type="number"></v-text-field>
		</v-flex>
    <v-btn color="info" @click="parsing">Загрузить</v-btn>
	</v-layout>
	<v-btn color="info" @click="getproduct">Grafik</v-btn>
	<v-btn color="info" @click="genpayurl">GEN PAY url teampay</v-btn>
	<v-container fluid grid-list-md>
		<v-data-iterator :items="items" :rows-per-page-items="rowsPerPageItems" :pagination.sync="pagination" content-tag="v-layout" hide-actions row wrap>
			<v-toolbar slot="header" class="mb-2" color="indigo darken-5" dark flat>
				<v-toolbar-title>This is a header</v-toolbar-title>
			</v-toolbar>

			<v-flex slot="item" slot-scope="props" xs12 sm6 md4 lg3>
				<v-card>
					<v-card-title class="subheading font-weight-bold">{{ props.item.name }}</v-card-title>

					<v-divider></v-divider>

					<v-list dense>
						<v-list-tile>
							<v-list-tile-content>Количество товара:</v-list-tile-content>
							<v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content>
						</v-list-tile>

						<v-list-tile>
							<v-list-tile-content>Количество на стим пей:</v-list-tile-content>
							<v-list-tile-content class="align-end">{{ props.item.fat }}</v-list-tile-content>
						</v-list-tile>

						<v-list-tile>
							<v-list-tile-content>Carbs:</v-list-tile-content>
							<v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
						</v-list-tile>

						<v-list-tile>
							<v-list-tile-content>Protein:</v-list-tile-content>
							<v-list-tile-content class="align-end">{{ props.item.protein }}</v-list-tile-content>
						</v-list-tile>

						<v-list-tile>
							<v-list-tile-content>Sodium:</v-list-tile-content>
							<v-list-tile-content class="align-end">{{ props.item.sodium }}</v-list-tile-content>
						</v-list-tile>

						<v-list-tile>
							<v-list-tile-content>Calcium:</v-list-tile-content>
							<v-list-tile-content class="align-end">{{ props.item.calcium }}</v-list-tile-content>
						</v-list-tile>

						<v-list-tile>
							<v-list-tile-content>Iron:</v-list-tile-content>
							<v-list-tile-content class="align-end">{{ props.item.iron }}</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-card>
			</v-flex>

			<v-toolbar slot="footer" class="mt-2" color="indigo" dark dense flat>
				<v-toolbar-title class="subheading">This is a footer</v-toolbar-title>
			</v-toolbar>
		</v-data-iterator>
	</v-container>
</div>
</template>

<script>
const axios = require('axios');
const { API } = require('../config.json');
export default {
	name: 'Parser',
	data() {
		return {
      Collvo: 10,
			rowsPerPageItems: [4, 8, 12],
			pagination: {
				rowsPerPage: 4
			},
			items: [{
					value: false,
					name: 'Steampay',
					calories: '',
					fat: '',
					carbs: '',
					protein: '',
					sodium: '',
					calcium: '14%',
					iron: '1%'
				},
				{
					value: false,
					name: 'Cupcake',
					calories: 305,
					fat: 3.7,
					carbs: 67,
					protein: 4.3,
					sodium: 413,
					calcium: '3%',
					iron: '8%'
				}
			]
		}
	},
	methods: {
		genpayurl: () => {
			axios.get(`${API}/product/parser/GenPayUrl`)
				.then(function(data) {
					console.log(data);
				})
		},
		parsing: () => {
			axios.get(`${API}/load/product/steampay/${this.Collvo}`)
				.then(function(val) {
					console.log(val);
				})
		},
		getproduct: function() {
			axios.get(`${API}getproduct/0`)
				.then(function(val) {
					var x = val.data;
					return this.items[0].calories = x.length;
				}.bind(this))
		}
	}
}
</script>
