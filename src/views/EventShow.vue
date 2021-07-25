<template>
  <div class="row container" id="container">
    <div class="col s12 m12">
      <div class="card blue-grey teal darken-4">
        <div class="card-content white-text">
          <span>фамилия </span>
          <h3>{{ event.title }}</h3>
          <span>Комментарии</span>
          <blockquote class="flow-text">{{ event.description }}</blockquote>
        </div>
        <div class="card-action white-text">
          <h5>Дата: {{ event.date | date}}</h5>
          <h5>Время: {{ event.time }}</h5> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>



export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>

</style>


