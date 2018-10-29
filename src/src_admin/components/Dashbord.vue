<template>
    <b-row class="dashinfo">
        <b-col>
          <h5>INFO 1</h5>
        </b-col>
        <b-col>
          <h5>INFO 2</h5>
        </b-col>
        <b-col>
          <h5>INFO 3</h5>
        </b-col>
    </b-row>
</template>

<script>
export default {
  name: 'Dashbord',
  data() {
    return {
      drawer: true,
      items: []
    }
  }
}
</script>

<style >
.dashinfo {
  color: white;
  margin: 8px;
  text-align: center;
  background-color: #202a37 !important;
  box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)!important;
}
.dashinfo .col {
  margin: 15px;
}
.theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
    background-color: rgba(1, 206, 162, 0.18);
}
</style>
