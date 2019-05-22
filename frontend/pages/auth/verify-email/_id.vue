<template>
  <div />
</template>

<script>
export default {
  middleware: 'anonymous',
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
  }
}
</script>
