<template>
  <v-alert
    :type="type"
    :value="value"
    dismissible
    transition="scale-transition"
    @input="onClose"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClose() {
      this.$emit('dismissed')
    }
  }
}
</script>
