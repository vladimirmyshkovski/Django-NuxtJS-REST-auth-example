<template>
  <v-toolbar fixed app>
    <v-toolbar-side-icon @click="$store.commit('core/toggleDrawer')" />
    <v-toolbar-title>Django NuxtJS REST auth example</v-toolbar-title>
    <v-spacer />
    <v-menu bottom left>
      <avatar slot="activator" :user="$store.state.auth.user" />
      <v-list v-if="!$store.state.auth.loggedIn">
        <v-list-tile v-for="(item, i) in anonymousItems" :key="i" :to="item.to">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-list v-if="$store.state.auth.loggedIn">
        <v-list-tile v-for="(item, i) in loggedInItems" :key="i" :to="item.to">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
import Avatar from '@/components/Avatar'

export default {
  middleware: 'auth',
  components: {
    Avatar
  },
  data: () => ({
    anonymousItems: [
      {
        title: 'Signup',
        to: '/auth/signup'
      },
      {
        title: 'Signin',
        to: '/auth/signin'
      }
    ],
    loggedInItems: [
      {
        title: 'Signout',
        to: '/auth/signout'
      }
    ]
  })
}
</script>
