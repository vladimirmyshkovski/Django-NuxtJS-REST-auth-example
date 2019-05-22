<template>
  <v-container>
    <v-layout justify-center mt-5>
      <v-card>
        <v-card-text>
          <v-container>
            <form @submit.prevent="onRestorePassword">
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
                <v-btn
                  :disabled="this.$store.getters.loading"
                  :loading="this.$store.getters.loading"
                  type="submit"
                  color="success"
                >
                  Restore
                  <span slot="loader" class="custom-loader">
                    <v-icon light>refresh</v-icon>
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
export default {
  asyncData({ params }) {
    return {
      uid: params.uid,
      token: params.token
    }
  },
  data() {
    return {
      uid: '',
      token: '',
      password: '',
      confirmPassword: '',
      errors: {
        password: [],
        confirmPassword: []
      },
      rules: {
        password: [
          value => !!value || 'Please, Enter password.',
          value =>
            value.length > 8 || 'Password must contain at least 8 characters.'
        ],
        confirmPassword: [
          value => !!value || 'Confirm password.',
          value => value === this.password || 'Passwords must match.'
        ]
      }
    }
  },
  methods: {
    onRestorePassword() {
      this.$store.dispatch('restorePasswordConfirm', {
        uid: this.uid,
        token: this.token,
        new_password1: this.password,
        new_password2: this.confirmPassword
      })
    }
  }
}
</script>
