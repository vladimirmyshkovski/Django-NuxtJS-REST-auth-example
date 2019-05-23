<template>
  <v-app>
    <navigation-drawer />
    <toolbar />
    <v-content>
      <v-container>
        <alert />
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="$store.state.core.fixed" app>
      <span>
        &copy;
        <a href="https://t.me/narnikgamarnik">
          Vladimir Myshkovski
        </a>
        2019
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import Alert from '@/components/Alert'
import NavigationDrawer from '@/components/NavigationDrawer'
import Toolbar from '@/components/Toolbar'

export default {
  components: {
    Alert,
    NavigationDrawer,
    Toolbar
  }
}
</script>
