<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{notification.message}}</p>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 3000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  methods: mapActions('notification', ['remove'])
}
</script>

<style scoped>
.notification {
 margin: 1em 0 1em; 
}
</style>