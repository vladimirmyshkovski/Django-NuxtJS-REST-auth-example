<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card class="px-3 py-3">
        <v-card-title class="headline">
          Welcome to the Django NuxtJS REST auth example,
          {{ $store.state.auth.user.username }}
        </v-card-title>
        <v-card-actions class="justify-center mt-3">
          <v-btn color="primary" flat nuxt outline to="/inspire">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
