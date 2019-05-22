<template>
  <v-layout v-if="$store.getters.messages" justify-center mt-5>
    <v-alert
      v-for="message in $store.getters.messages"
      :key="message.text"
      :type="message.type"
      :value="$store.getters.show"
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
