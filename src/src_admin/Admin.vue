<template>
<div id="app">
  <b-container  fluid >
  <b-row>
    <!-- basic -->
    <v-navigation-drawer :mini-variant.sync="mini" v-model="drawer" hide-overlay stateless>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon name="play" scale="2"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
            <router-link to="/">
              <v-list-tile-title>KASPER ENGINE</v-list-tile-title>
              </router-link>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon name="angle-left" scale="2"></v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-action>
            <v-icon :name="item.icon" scale="1"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="item.link">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- NAV END -->
    <b-col>
    <router-view/>
  </b-col>
</b-row>
</b-container>
</div>
</template>

<script>
export default {
  name: 'Admin',
  title: 'KASPER ENGINE',
  data() {
    return {
      drawer: true,
      items: [{
          title: 'Товары',
          link: '/Products',
          icon: 'list-ol'
        },
        {
            title: 'PARSER',
            link: '/parser',
            icon: 'list-ol'
        },
        {
          title: 'Info',
          link: '/Info',
          icon: 'coins'
        },
      ],
      mini: false,
      right: null
    }
  }
}
</script>

<style>
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #171e27;
}
aside.v-navigation-drawer.v-navigation-drawer--open.theme--light {
  position: relative;
  background: #202a37;
  height: -webkit-fill-available !important;
}
.v-list.pa-0.theme--light {
  background: #171e27;
}

a.v-list__tile.v-list__tile--link.theme--light {
  background: #171e27;
}

.theme--light.application {
  background: #fafafa;
  color: rgba(251, 251, 251, 0.87) !important;
}

.application--wrap {
  background: #171e27;
  color: white;
}

.v-list__tile__content {
  color: #cac9c9;
  font-weight: 700;
}
svg.fa-icon {
  color: #01cea2;
  cursor: pointer;
}
svg.fa-icon:hover {
  color: #0aecbd;
}
a.router-link-active {
    color: white;
}
a {
    color: #20c997;
}
</style>
