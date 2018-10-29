<template>
<div>
  <b-col class="producttables">
    <v-btn color="blue darken-1" flat @click.native="genpayurl">Сгенерировать ссылки для оплаты</v-btn>
    <v-toolbar flat color="white">
      <v-toolbar-title>MY STORE</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog">
        <v-btn slot="activator" color="primary" dark class="mb-2">Добавить</v-btn>
        <!-- TABS -->
        <v-tabs centered color="#202a37" dark icons-and-text>
          <v-tabs-slider color="#202a37"></v-tabs-slider>
          <v-tab href="#tab-1">Товар
            <v-icon scale="2" name="shopping-bag" />
          </v-tab>
          <v-tab href="#tab-2">SEO
            <v-icon scale="2" name="star-half-alt" />
          </v-tab>
          <v-tab-item id="tab-1">
            <v-card flat>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field v-model="editedItem.name" @change="genUrl" label="Названия"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.url" label="URL"></v-text-field>
                      <v-text-field v-model="editedItem.category" label="Категория"></v-text-field>
                      <v-text-field v-model="editedItem.prise" label="Цена"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.type" label="Тип"></v-text-field>
                      <v-text-field v-model="editedItem.region" label="Регион"></v-text-field>
                      <v-text-field v-model="editedItem.pay" label="Ссылка на оплату"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-img :src="editedItem.img" max-height="165" contain class="grey darken-4"></v-img>
                      <v-text-field v-model="editedItem.img" label="Постер"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <div wrap class="sescript">
                  <h5>Описания</h5>
                  <vue-editor v-model="txteditor"></vue-editor>
                </div>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item id="tab-2">
            <v-card flat>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field v-model="editedItem.meta.keywords" label="keywords"></v-text-field>
                      <v-text-field v-model="editedItem.meta.description" label="description"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>

        </v-tabs>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Закрыть</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="desserts" class="elevation-1">
      <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.prise.rub }}</td>
              <td class="text-xs-right">{{ props.item.type }}</td>
              <td class="text-xs-right">{{ props.item.category }}</td>
              <td class="text-xs-right">{{ props.item.region }}</td>
              <td class="justify-center layout px-0">
                <div @click="editItem(props.item)">
                  <v-icon name="edit" scale="1" style="color: #01aece;"></v-icon>
                </div>
                <div @click="deleteItem(props.item)">
                  <v-icon name="trash-alt" scale="1" style="color: #ff3a5a;"></v-icon>
                </div>
              </td>
            </template>
      <template slot="footer">
  <td colspan="100%">
    <strong>This is an extra footer</strong>
  </td>
</template>
      <template slot="no-data">
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
    </v-data-table>

  </b-col>
</div>
</template>

<script>
import {
  VueEditor
} from 'vue2-editor'
const axios = require('axios');
const { API } = require('../config.json');

export default {
  components: {
    VueEditor
  },
  data: () => ({
    txteditor: "",
    dialog: false,
    loading: "success",
    headers: [{
        text: 'Названия',
        align: 'left',
        sortable: true,
        value: 'name'
      },
      {
        text: 'Цена',
        value: 'prise'
      },
      {
        text: 'Категория',
        value: 'category'
      },
      {
        text: 'Тип',
        value: 'type'
      },
      {
        text: 'Регион',
        value: 'region'
      },
      {
        text: 'Actions',
        value: 'name',
        align: 'right',
        sortable: false
      }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      url: '',
      category: 'stimkey',
      type: 'key',
      region: 'ru',
      prise: 0,
      pay: 'https://qiwi.com/',
      description: '',
      meta:{
        keywords: "",
        description: ""
      }
    },
    defaultItem: {
      name: '',
      url: '',
      category: 'stimkey',
      type: 'key',
      region: 'ru',
      prise: 0,
      pay: 'https://qiwi.com/',
      description: "NOOO",
      meta:{
        keywords: "",
        description: ""
      }
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Новый товар' : 'Редактировать'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {

    initialize() {
      var x;
      axios.get(`${API}getproduct/0`)
        .then(function(val) {
          x = val.data;
          return this.desserts = x;
        }.bind(this))
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.txteditor = this.editedItem.description;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      var msconfirm = confirm(`Вы Уверены что товар надо удалить? ${item.name}`);
      if(msconfirm){
        axios.delete(`${API}deleteprodukt/${item._id}`, {
            headers: {
              'content-type': 'json'
            }
          })
          .then(function(val) {
            console.log(val);
          })
        console.log(item._id);
        this.desserts.splice(index, 1)
      }
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      this.editedItem.description = this.txteditor;
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        console.log("this.desserts[this.editedIndex] ", this.desserts[this.editedIndex]);
        axios.put(`${API}updateproduct`, {
            headers: {
              'content-type': 'json'
            },
            data: this.desserts[this.editedIndex]
          })
          .then(function(val) {
            console.log(val);
          })
      } else {
        this.desserts.push(this.editedItem)
        axios.post(`${API}createproduct`, {
            data: this.editedItem
          })
          .then(function(val) {
            console.log(val);
          })
      }
      this.close()
    },

    genUrl() {
      let url = this.editedItem.name.replace(/'| /gi, "-");
      this.editedItem.url = url;
    }
  }
}
</script>

<style>
.producttables.col {
  margin-top: 5px;
}

table.v-datatable.v-table.theme--light {
  background-color: rgb(32, 42, 55);
  color: #c4c4c4;
}

ul.v-pagination.theme--light {}

button.v-pagination__item.v-pagination__item--active.primary {
  background: #01cea2;
}

button.v-pagination__item {
  background: darkblue;
}

.theme--light.v-pagination .v-pagination__item {
  background: #284264;
  color: wheat;
}

.theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
  background: #171e27;
}

.theme--light.v-table tbody tr:not(:last-child) {
  .theme--light.v-table tbody tr: not(:last-child);
  border-bottom: 1px solid #00b68f66;
}

.v-toolbar__content {
  background: #202a37;
  color: #c4c4c4;
}

.theme--light.v-table thead tr:first-child {
  color: white;
  border-bottom: 1px solid #01aece;
}

.theme--light.v-table thead th {
  color: white;
}

.theme--light.v-datatable thead th.column.sortable.active,
.theme--light.v-datatable thead th.column.sortable.active i,
.theme--light.v-datatable thead th.column.sortable:hover {
  color: #01aece;
}

.v-dialog {
  overflow-y: visible;
}

.theme--light.v-card {
  background: #171e27;
  color: #e5e5e5;
}

.v-card__text {}

.container.grid-list-md {}

.theme--light.v-label {
  color: white;
}

.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: #b9b7b7;
}

.v-input.v-text-field.v-input--is-label-active.v-input--is-dirty.theme--light {
  color: #01cea2 !important;
}

.v-input__slot {
  color: #01cea2 !important;
}

td.justify-center.layout.px-0 div {
  background: #171e27;
  margin: 2px;
  padding: 12px;
  cursor: pointer;
}

button.v-btn.v-btn--flat.theme--light.blue--text.text--darken-1 {
  background: #202a37;
}

.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
  background-color: #01cea2;
}

.ql-toolbar.ql-snow {
  border: 1px solid #01cea2;
  background: #202a37;
}

#quill-container {
  border: 1px solid #01cea2;
  background: #bbbec2;
  color: black;
  height: 260px;
}

.v-table__overflow {
  overflow-x: auto;
  overflow-y: auto;
  width: 100%;
  max-height: 595px;
}

.v-menu__content.v-menu__content--auto.menuable__content__active.theme--light {
  position: fixed;
  overflow-y: hidden;
}

.v-datatable__actions {
  background-color: #171e27;
  color: #01cea2;
}

.theme--light.v-datatable .v-datatable__actions {
  background-color: #171e27;
  color: #01cea2;
}

.theme--light.v-select .v-select__selections {
  color: #b9b7b7 !important;
}

.v-list.theme--light {
  background: #202a37;
}
.v-card__text {
    overflow-y: scroll !important;
    overflow-x: hidden;
    height: 566px;
}
</style>
