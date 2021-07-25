<template>
  <div class="container">
      <h1>Страница {{resource}} не найдена </h1>
      <router-link to="/">Главная страница</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>