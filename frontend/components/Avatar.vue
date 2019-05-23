<template>
  <v-avatar size="40">
    <v-icon v-if="!user" x-large>
      account_circle
    </v-icon>
    <jazzicon
      v-if="user"
      :salt="user.id"
      :address="stringToHex(user.id)"
      :diameter="40"
      class="mt-1"
    />
  </v-avatar>
</template>
<script>
import Jazzicon from 'vue-jazzicon'

export default {
  components: {
    Jazzicon
  },
  props: {
    user: {
      type: Object,
      default: () => null
    }
  },
  watch: {
    user(value) {
      return value
    }
  },
  methods: {
    stringToHex(string) {
      const value = String(string)
      const array = []
      for (let n = 0, l = value.length; n < l; n++) {
        const hex = Number(value.charCodeAt(n)).toString(16)
        array.push(hex)
      }
      return array.join('')
    }
  }
}
</script>
