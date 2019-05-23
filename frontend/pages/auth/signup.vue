<template>
  <v-container>
    <v-layout justify-center>
      <v-card>
        <v-card-text>
          <v-container>
            <form ref="form" @submit.prevent="onSignup">
              <v-layout row wrap justify-center my-3>
                <v-btn color="primary" @click="onFacebookSignup">
                  Facebook
                </v-btn>
                <v-btn color="error" @click="onGoogleSignup">
                  Google
                </v-btn>
              </v-layout>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    id="username"
                    v-model="username"
                    :rules="rules.username"
                    :error="errors.username.length > 0"
                    :error-messages="errors.username"
                    name="username"
                    label="Username"
                    type="string"
                    required
                    @focus="errors.username = []"
                  />
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    id="email"
                    v-model="email"
                    :rules="rules.email"
                    :error="errors.email.length > 0"
                    :error-messages="errors.email"
                    name="email"
                    label="Email"
                    type="email"
                    required
                    @focus="errors.email = []"
                  />
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    id="password"
                    v-model="password"
                    :rules="rules.password"
                    :error="errors.password.length > 0"
                    :error-messages="errors.password"
                    name="password"
                    label="Password"
                    type="password"
                    required
                    @focus="errors.password = []"
                  />
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs-12>
                  <v-text-field
                    id="confirmPassword"
                    v-model="confirmPassword"
                    :rules="rules.confirmPassword"
                    :error="errors.confirmPassword.length > 0"
                    :error-messages="errors.confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    required
                    @focus="errors.confirmPassword = []"
                  />
                </v-flex>
              </v-layout>
              <v-layout justify-center mt-3 class="text-xs-center">
                <router-link :to="signInUrl">
                  Already have an account?
                </router-link>
              </v-layout>
              <v-layout justify-center mt-3>
                <v-btn
                  :disabled="$store.state.core.loading"
                  :loading="$store.state.core.loading"
                  type="submit"
                  color="success"
                >
                  Sign up
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </v-btn>
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
import Cookies from 'js-cookie'

export default {
  middleware: 'anonymous',
  head: {
    title: 'SignUp page',
    script: [
      {
        src: '/js/facebook-sdk.js'
      },
      {
        src: 'https://apis.google.com/js/api:client.js'
      }
    ]
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {
        username: [],
        email: [],
        password: [],
        confirmPassword: []
      },
      rules: {
        username: [value => !!value || 'Please, enter username.'],
        email: [
          value => !!value || 'Please, enter your email address.',
          value => /.+@.+/.test(value) || 'Please enter a valid email address.'
        ],
        password: [
          value => !!value || 'Please, Enter password.',
          value =>
            value.length > 8 || 'Password must contain at least 8 characters.'
        ],
        confirmPassword: [
          value => !!value || 'Confirm password.',
          value => value === this.password || 'Passwords must match.'
        ]
      },
      signInUrl: { path: '/auth/signin' },
      facebookLoginParams: {
        scope: 'email',
        return_scopes: true
      }
    }
  },
  computed: {
    errorMessages() {
      return this.$store.getters.errors
    }
  },
  watch: {
    errorMessages(values) {
      if (values !== null) {
        for (const value in values) {
          if (value === 'password1') {
            this.errors.password = values[value]
          } else if (value === 'password2') {
            this.errors.confirmPassword = values[value]
          } else {
            this.errors[value] = values[value]
          }
        }
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
    onSignup() {
      this.$store.dispatch('auth/signUp', {
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        ref: Cookies.get('ref')
      })
    },
    onFacebookSignup(event, data) {
      window.FB.login(response => {
        if (response.status === 'connected') {
          this.$store.dispatch('auth/facebookSignUp', response.authResponse)
        }
      }, this.facebookLoginParams)
    },
    onGoogleSignup() {
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
    clear() {
      this.$refs.form.reset()
    }
  }
}
</script>
