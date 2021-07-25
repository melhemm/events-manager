<template>
  <div class="row container">
    <span>Почта: admin@admin.com</span> <br>
    <span>Пароль: 123456</span>
    <form class="col s12" @submit.prevent="login">

      <div class="input-field col s6">
        <input id="email" v-model="email" type="email" name="email" value placeholder="Почта" />
      </div>

      <div class="input-field col s6">
        <input id="password" v-model="password" type="password" name value placeholder="Пароль">
      </div>

      <p v-if="status === 400">
        Invalid login info.
      </p>

      <div class="input-field col s12">
        <button type="submit" name="button" class="waves-light deep-purple darken-4 btn">
          Далее
        </button>
      </div>
        <p>{{error}}</p>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'LoginUser',
    data() {
      return {
        email: '',
        password: '',
        error: null,
        status: null
      }
    },
    methods: {
      login(e) {
        this.$store
          .dispatch('login', {
            email: this.email,
            password: this.password
          })
          .then(() => {
            this.$router.push('/')
          })
          .catch((err) => {
            this.error = err.response.data.error
          })

      }
    }
  }
</script>