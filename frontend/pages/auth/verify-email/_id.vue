<template>
  <v-app>
    <v-container>
      <v-layout row>
        <v-flex xs8 offset-xs2>
          <alert
            v-if="error || success"
            :key="
              Math.random()
                .toString(10)
                .substr(2, 6)
            "
            :text="message"
            :type="alertType"
            @dismissed="onDismissed"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '~/components/Alert.vue'

export default {
  layout: 'map',
  middleware: 'anonymous',
  components: { Alert },
  computed: {
    ...mapGetters(['error', 'success'])
  },
  watch: {
    success() {
      this.message =
        'You have successfully confirmed your email. Now you can log in.'
      this.alertType = 'success'
      return this.$router.push('/auth/signin/')
    },
    error() {
      this.message = 'Invalid verification key.'
      this.alertType = 'error'
    }
  },
  asyncData({ params }) {
    return {
      id: params.id,
      message: '',
      alertType: null
    }
  },
  mounted() {
    this.$store.dispatch('verifyEmail', {
      key: this.$route.params.id
    })
  },
  methods: {
    onDismissed() {
      this.$store.dispatch('clearError')
      this.$router.push('/')
    }
  }
}
</script>
