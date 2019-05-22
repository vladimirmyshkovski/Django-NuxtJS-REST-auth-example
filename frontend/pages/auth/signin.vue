<template>
  <v-container fluid>
    <v-layout justify-center mt-5>
      <v-card>
        <v-card-text>
          <v-container>
            <form ref="form" @submit.prevent="onSignin">
              <v-layout row wrap justify-center my-3>
                <v-btn color="primary" @click="onFacebookLogin">
                  Facebook
                </v-btn>
              </v-layout>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    id="username"
                    v-model="username"
                    :rules="rules.username"
                    name="username"
                    label="Login"
                    type="text"
                    required
                  />
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    id="password"
                    v-model="password"
                    :rules="rules.password"
                    name="password"
                    label="Password"
                    type="password"
                    required
                  />
                </v-flex>
              </v-layout>
              <v-layout justify-center mt-3>
                <v-btn
                  :disabled="this.$store.getters.loading"
                  :loading="this.$store.getters.loading"
                  type="submit"
                  color="success"
                  class="grey--text text--darken-4"
                >
                  Sign in
                  <span slot="loader" class="custom-loader">
                    <v-icon light>refresh</v-icon>
                  </span>
                </v-btn>
              </v-layout>
              <v-layout justify-center mt-3>
                <router-link :to="signUpUrl" class="white--text">
                  You do not have an account?
                </router-link>
              </v-layout>
              <v-layout justify-center mt-3>
                <router-link :to="restorePasswordUrl" class="white--text">
                  Forgot your password?
                </router-link>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  middleware: 'anonymous',
  layout: 'default',
  head: {
    title: 'SignIn page',
    script: [
      {
        src: '/js/facebook-sdk.js'
      }
    ]
  },
  data: () => {
    return {
      username: '',
      password: '',
      rules: {
        username: [value => !!value || 'Please, enter username.'],
        password: [value => !!value || 'Please, enter password.']
      },
      restorePasswordUrl: { path: '/auth/password/reset' },
      signUpUrl: { path: '/auth/signup' },
      facebookLoginParams: {
        scope: 'email',
        return_scopes: true
      }
    }
  },
  methods: {
    onFacebookLogin(event, data) {
      window.FB.login(response => {
        console.log('response in onFacebookLogin', response) // eslint-disable-line no-console
        console.log('response.status', response.status) // eslint-disable-line no-console
        if (response.status === 'connected') {
          this.$store.dispatch('facebookSignUp', response.authResponse)
        }
      }, this.facebookLoginParams)
    },
    onSignin() {
      this.$store.dispatch('signIn', {
        username: this.username,
        password: this.password
      })
    },
    clear() {
      this.$refs.form.reset()
    }
  }
}
</script>
