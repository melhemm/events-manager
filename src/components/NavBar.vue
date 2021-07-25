<template>
    <nav class="purple darken-1">
    <div class="nav-wrapper container">
      <router-link to="/" class="brand-logo left">
        Админ
      </router-link>
      <ul id="nav-mobile" class="right" v-if="loggedIn">
        <li><router-link :to="{ name: 'event-list' }">Все записи</router-link></li>
        <li><router-link :to="{ name: 'event-create' }">Cоздать запись</router-link> </li>
      </ul>
      <ul id="nav-mobile" class="right" v-if="!loggedIn">
        <li><router-link to="/login">Вход</router-link></li>
        <!-- <li><router-link to="/register">Регистрация </router-link></li> -->
      </ul>
      <ul v-else class="right">
        <button type="button" class="waves-light red btn" @click="logout">
          Выход
        </button>
      </ul>
      
    </div>
  </nav>
  </template>

<script>
  import {authComputed} from '../store/helpers'
  export default {
    computed: {
      ...authComputed
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    },
  }
</script>