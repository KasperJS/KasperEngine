<template>
<div>
  <meta name="description" :content="item.meta.description">
  <meta name="keywords" :content="item.meta.keywords">
  <meta property="og:image" :content="item.img" />
  <meta property="og:title" :content="item.name" />
  <meta property="og:description" :content="item.meta.description" />
  <meta property="og:type" content="product" />
  <meta property="og:url" :content="`https://pay-play/store/${this.$route.params.item}`" />
  <title>{{ item.name }}</title>
  <div class="card text-center">
    </div>
    <div class="card-body">
      <div class="container">
        <div class="row">
          <div class="col">
            <img :src="api+'img'+item.img" :alt="item.name" class="rounded float-left">
          </div>
          <div class="col">
            <div class="card-header"> <h2>{{ item.name }}</h2>
            <b-list-group>
              <b-list-group-item >Регион: {{ item.region }}</b-list-group-item>
              <b-list-group-item >Лицензионный ключ активации в: {{ item.type }}</b-list-group-item>
              <b-list-group-item >Язык: {{ item.region }}</b-list-group-item>
            </b-list-group>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer text-muted">
      <!-- <div class="storeprise">
        {{ item.prise }}
      </div> -->
      <a :href="item.pay" class="btn btn-primary" target="_blank">{{ item.prise }} Купить</a>
    </div>
  </div>
<div id="player">

</div>
</div>
</template>
<script>
import { API } from '../config.json';
const axios = require('axios');
export default {
  name: 'Product',
  data() {
    return {
      api: API,
      item: {
        name:"",
        img:"",
        description:"",
        pay:"",
        prise:"",
        info:"",
        region:"",
        type:"",
        meta:{
          keywords: "",
          description: ""
        }
      }
    }
  },
  created(){
    axios.get(`${API}findproduct/${this.$route.params.cat}/${this.$route.params.item}/`)
     .then(function (data) {
       console.log(data);
      var IT = {
         name: data.data.name,
         img: data.data.img,
         description: data.data.description,
         pay: data.data.pay,
         prise: data.data.prise.rub,
         info: data.data.info,
         region: data.data.region,
         type: data.data.type,
         meta: {
           keywords: data.data.meta.keywords,
           description: data.data.meta.description
         }
       };
console.log(this.$route.params.categori);
console.log(this.item);
       return  this.item = IT;
    }.bind(this))
  }
}
// $route.params.item


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-body {
    padding: 0;
}
.card-body>.container {
    padding: 0;
}
.storeprise {
  width: 60%;
}

img.rounded.float-left {
  width: 100%;
}

.card-body {
  background: #0f0f1d;
}

.card-header {
  background: #0f0f1d;
  color: whitesmoke;
}

.card-footer.text-muted {
  background: #0f0f1d;
}

.card.text-center {
  color: #c3c3c3;
  border: navajowhite;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #00000000;
  border: none;
  box-shadow: 0px 1px #20c99717;
}

.card-footer.text-muted {
    width: 49%;
}

a.btn.btn-primary {
  color: #20c997;
  background-color: #0c0f13c9;
  border-color: #223385;
  width: 100%;
  height: 47px;
  font-size: 21px;
}

.card {
    background-color: #0f0f1d;
}
</style>
