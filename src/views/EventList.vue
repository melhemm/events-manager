<template>
  <div class="container mt-3">
    
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
      <i class="material-icons large">chevron_left</i>
      </router-link>
      <template v-if="hasNextPage"> | </template>
    </template>
    <router-link v-if="hasNextPage" :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">
      <i class="material-icons large">chevron_right</i>
    </router-link>
      
  </div>
</template>

<script>
  import EventCard from '@/components/EventCard.vue'
  import {
    mapState
  } from 'vuex'
  import store from '../store/store'

  function getPageEvents(to, next) {
    const currentPage = parseInt(to.query.page) || 1
    store.dispatch('event/fetchEvents', {
      page: currentPage
    }).then(() => {
      to.params.page = currentPage
      next()
    })
  }

  export default {
    props: {
      page: {
        type: Number,
        required: true
      }
    },
    components: {
      EventCard
    },
    beforeRouteEnter(to, from, next) {
      // ...
      getPageEvents(to, next)
    },
    beforeRouteUpdate(to, from, next) {
      getPageEvents(to, next)
    },
    computed: {
      hasNextPage() {
        return this.event.eventsTotal > this.page * this.event.perPage
      },
      ...mapState(['event', 'user'])
    }
  }
</script>

<style scoped>
.mt-3 {
  margin-top: 3rem;
}

table {
  font-size: 18px;
  height: 10vh;
}
</style>