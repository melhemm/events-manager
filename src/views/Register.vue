<template>
  <div class="row container" >
    <form class="col s12" @submit.prevent="register">

        <div class="input-field col s6">
          <input id="first_name" 
          type="text" 
          v-model="name" 
          name="name" 
          value 
          placeholder="Имя">
        </div>

        <div class="input-field col s6">
          <input id="email" 
          v-model="email" 
          type="email" 
          name="email" 
          value 
          placeholder="Почта">
        </div>

        <div class="input-field col s12">
          <input id="password" 
          v-model="password" 
          type="password" 
          name="password" 
          value 
          class="validate" placeholder="Пароль">
      </div>
      <div class="row" v-if="status === 400">
        <p >
          Please enter different info.
        </p>
      </div>
      
      <div class="input-field col s12">
        <button type="submit" name="button" class="waves-light deep-purple darken-4 btn">
          Регистрация
        </button>
      </div>

      <ul>
        <li v-for="(error, index ) in errors" :key="index">{{error}}</li>
      </ul>
      
    </form>
  </div>

</template>

<script>
export default {
  name: 'RegisterUser',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      errors: null,
      status: null
    }
  },
  methods: {
    register () {
      this.$store
        .dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => { this.$router.push('/') })
        .catch((err) => {this.errors = err.response.data.errors})
    }
  }
}
</script>
