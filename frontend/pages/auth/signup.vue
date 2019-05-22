<template>
  <v-container>
    <v-layout justify-center mt-5>
      <v-card>
        <v-card-text>
          <v-container>
            <form ref="form" @submit.prevent="onSignup">
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
              <v-layout justify-center mt-3>
                <router-link :to="signInUrl" class="white--text">
                  Already have an account?
                </router-link>
              </v-layout>
              <v-layout justify-center mt-3>
                <v-btn
                  :disabled="this.$store.getters.loading"
                  :loading="this.$store.getters.loading"
                  type="submit"
                  color="success"
                  class="grey--text text--darken-4"
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

<script>
import Cookies from 'js-cookie'

export default {
  middleware: 'anonymous',
  layout: 'site',
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
      signInUrl: { path: '/auth/signin' }
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
  methods: {
    onSignup() {
      this.$store.dispatch('signUp', {
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        ref: Cookies.get('ref')
      })
    },
    clear() {
      this.$refs.form.reset()
    }
  }
}
</script>
