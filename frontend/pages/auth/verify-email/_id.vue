<template>
  <div />
</template>

<script>
export default {
  middleware: 'anonymous',
  head: {
    title: 'Verify email page'
  },
  asyncData({ params }) {
    return {
      id: params.id,
      message: '',
      alertType: null
    }
  },
  mounted() {
    this.$store.dispatch('auth/verifyEmail', {
      key: this.$route.params.id
    })
  }
}
</script>
