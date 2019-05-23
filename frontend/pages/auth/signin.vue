<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-card>
        <v-card-text>
          <v-container>
            <form ref="form" @submit.prevent="onSignin">
              <v-layout row wrap justify-center my-3>
                <v-btn color="primary" @click="onFacebookSignin">
                  Facebook
                </v-btn>
                <v-btn color="error" @click="onGoogleSignin">
                  Google
                </v-btn>
              </v-layout>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    id="username"
                    v-model="username"
                    :rules="rules.username"
                    name="username"
                    label="Username"
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
                  :disabled="$store.state.core.loading"
                  :loading="$store.state.core.loading"
                  type="submit"
                  color="success"
                >
                  Sign in
                  <span slot="loader" class="custom-loader">
                    <v-icon light>refresh</v-icon>
                  </span>
                </v-btn>
              </v-layout>
              <v-layout justify-center mt-3 class="text-xs-center">
                <router-link :to="signUpUrl">
                  You do not have an account?
                </router-link>
              </v-layout>
              <v-layout justify-center mt-3 class="text-xs-center">
                <router-link :to="restorePasswordUrl">
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
<style>
@import '@/assets/style/custom-loader.css';
</style>
<script>
export default {
  middleware: 'anonymous',
  head: {
    title: 'SignIn page',
    script: [
      {
        src: '/js/facebook-sdk.js'
      },
      {
        src: 'https://apis.google.com/js/api:client.js'
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
  async mounted() {
    await this.$nextTick(() => {
      if (window.FB) {
        window.FB.getLoginStatus(response => {
          if (response.status === 'connected') {
            this.$store.dispatch('auth/facebookSignUp', response.authResponse)
          }
        })
      }
      if (
        window.gapi &&
        window.gapi.auth2.getAuthInstance() &&
        window.gapi.auth2.getAuthInstance().isSignedIn.get()
      ) {
        this.onGoogleSignin()
      }
    })
  },
  methods: {
    onFacebookSignin(event, data) {
      window.FB.login(response => {
        if (response.status === 'connected') {
          this.$store.dispatch('auth/facebookSignUp', response.authResponse)
        }
      }, this.facebookLoginParams)
    },
    onGoogleSignin() {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id:
            '104203513504-pjncrp8dconf7vmg430olec04kojo3bs.apps.googleusercontent.com'
        })
        const authInstance = window.gapi.auth2.getAuthInstance()
        window.gapi.auth2.SignInOptions = { scope: 'profile email' }
        authInstance.signIn({ scope: 'profile email' }).then(response => {
          this.$store.dispatch('auth/googleSignUp', response.Zi)
        })
      })
    },
    onSignin() {
      this.$store.dispatch('auth/signIn', {
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
