<template>
  <v-layout justify-center py-2>
    <v-alert
      v-for="message in $store.state.alert.messages"
      :key="message.text"
      :type="message.type"
      :value="$store.state.alert.show"
      dismissible
      transition="scale-transition"
      @input="onClose"
    >
      {{ message.text }}
    </v-alert>
  </v-layout>
</template>

<script>
export default {
  methods: {
    onClose() {
      this.$emit('dismissed')
    }
  }
}
</script>
