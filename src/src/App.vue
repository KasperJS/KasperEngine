<template>
  <div id="app">
    <div class="background"></div>
    <div>
      <Header-a> </Header-a>
      <b-container class="bv-example-row" id="content">
        <router-view/>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      sitename: 'Pay Play',
    }
  },

}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
body {
  background-color: #0c0f13;
}
header {
    background: #0c0f1375;
    margin-bottom: 70px;
}
.navhed {
  background-color: #0f141a;
}
a.btn.btn-primary.btn-sm {
    background: #1f8ef1;
}
#content {
    background: #0f0f1d;
}
.background {
  height: 395px;
  width: 100%;
  position: fixed;
  background: url(https://www.gry-online.pl/galeria/topy/239537618.jpg);
  background-size: 100%;
  background-position: top;
  background-repeat: no-repeat;
  z-index: -1;
}
</style>
