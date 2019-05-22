<template>
  <v-navigation-drawer
    v-model="this.$store.getters.drawer"
    :clipped="this.$store.getters.clipped"
    fixed
    app
  >
    <v-list>
      <v-list-tile router exact>
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="Home" />
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
