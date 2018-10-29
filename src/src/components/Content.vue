<template>
  <div>
    <Loader-a v-if="loading"> </Loader-a>
    <meta name="title" :content="store.title">
    <meta name="description" :content="store.description">
    <meta name="keywords" :content="store.keywords">
      <title>{{store.title}}</title>
      <b-row v-show="loaddon">
        <div v-for="(index, item) in storeitem">
          <div @click="View(index.url, index.category)">
          <b-card  :img-src="api+'img'+index.img"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 14rem;"
                    class="mb-2">
              <p class="card-text">
                <div class="info">
                  <p class="prise">{{index.prise.rub}} RUB</p>
                  <p class="type">{{index.type}}</p>
                </div>
              </p>
              <div class="btngroup">
                <router-link class="name-a" :to="index.url">{{ index.name }}</router-link>
                <b-button href="#" variant="primary" size="sm">Купить<v-icon name="shopping-cart"/></b-button>
             </div>
          </b-card>
          </div>
        </div>
      </b-row>
      <b-container fluid class="bv-example-row">
        <button v-on:click="storeitems" ><v-icon name="sync-alt"/></button>
        <b-row>
          <b-col md="6" offset-md="3">
            <b-pagination-nav
              :link-gen="linkGen"
              :number-of-pages="255"
              v-model="currentPage"
              />
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
import { API } from '../config.json';
const axios = require('axios');

export default {
name: 'Content',
  data() {
    return{
      cat: 'all',
      api: API,
      loading: true,
      loaddon: false,
      skip: 8,
      currentPage: 1,
      title: 'купить yjdbyrb cnbv FIFA 19 ',
      meta: 'У нас можно купить ключ FIFA 19 ',
      storeitem: [],
      store: {
        title: "Pay Play Free Best key games",
        keywords:"Play ключи для стима",
        description:"ключи для стима"
      }
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(this.cat);
      console.log(this.$route.params.cat);
      this.cat = this.$route.params.cat;
      this.storeitem = [];
      this.storeitems();
    },
    currentPage: function () {
      this.nextpage();
    },
    loading: function () {
      if(this.loading){
        this.loaddon = false;
      }else {
        this.loaddon = true;
      }
    }
  },
  methods: {
    storeitems: function () {
      axios.get(`${API}getproduct/${this.$route.params.cat}/${this.storeitem.length}`)
       .then(function (data) {
         this.loading = true;
         this.storeitem.push(...data.data);
      }.bind(this))
    },
    linkGen (pageNum) {
      return `#/page/${this.cat}/${pageNum}`
    },
    nextpage: function () {
      this.loading = true;
      var colv = this.currentPage*20;
      axios.get(`${API}getproduct/${this.$route.params.cat}/${colv}`)
       .then(function (data) {
         this.storeitem = [];
         this.storeitem.push(...data.data);
      }.bind(this))
    },
    View: function (url, cat) {
      location.href = `#/store/${cat}/${url}`;
    }
  },
  created(){
    var page = this.$route.params.page;
      if(page){
        var pages = page*20;
        axios.get(`${API}getproduct/${this.$route.params.cat}/${pages}`)
         .then(function (data) {
            this.storeitem = [];
            this.storeitem.push(...data.data);
        }.bind(this))
      }else {
        axios.get(`${API}getproduct/${this.cat}/${this.storeitem.length}`)
         .then(function (data) {
           this.storeitem.push(...data.data);
        }.bind(this))
      }

  },
  beforeUpdate() {
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.name-a{
  overflow-x: hidden;
  overflow-y: hidden;
  height: 43px;
  display: block;
}
.card-body {
    margin:  0;
    padding: 8px;
}
a.page-link {
    background: #0c0f13;
    border: none;
    box-shadow: 0px 0px 8px -1px #03A9F4;
    color: #a9d7ff;
}

a.page-link:hover {
    background: #0c0f13;
    color: white;
    box-shadow: 0px 0px 2px 1px #03a9f4;
}
article.card.mb-2 {
  cursor: pointer;
  max-width: 100% !important;
  margin: 10px;
  background: #161723;
  color: white;
  width: 265px;
  border-radius: 7px;
}

h4.card-title {
    text-align:  center;
    font-size: 16px;
}
.info {
    position:  absolute;
    width: 100%;
    top: 4px;
    left:  0;
    color: var(--light);
    font-weight: 500;
    text-transform: uppercase;
}

.info p {
    background: #000000bf;
    padding-right: 10px;
    padding-left: 6px;
}
p.prise {
    float:  left;
    border-radius: 0 8px 8px 0;
}

p.type {
    float:  right;
    border-radius: 8px 0 0 8px;
    background: #000000b5;
}
a.btn.btn-primary.btn-sm {
    width: 100%;
    background: linear-gradient(40deg,#2c8eb3,#232e73)!important;
    box-shadow: 0px 3px 2px 0px #000000;
}
.btngroup svg.fa-icon {
    width: 10%;
    height: auto;
    float:  right;
    margin-right: 7px;
    margin: 2px;
    color: var(--teal);
}
</style>
