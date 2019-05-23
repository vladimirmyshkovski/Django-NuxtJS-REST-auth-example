<template>
  <v-navigation-drawer
    v-model="$store.state.core.drawer"
    :clipped="$store.state.core.clipped"
    fixed
    app
  >
    <v-list>
      <v-list-tile router exact to="/">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile router exact to="/inspire">
        <v-list-tile-action>
          <v-icon>extension</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Inspire</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
