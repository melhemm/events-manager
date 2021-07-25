<template>
  <div class="row container">
    <h1>Cоздать запись</h1>

    <form @submit.prevent="createEvent">
      <BaseInput label="фамилия пациента" 
        v-model="event.title" type="text" 
        placeholder="фамилия пациента"
        class="field"
        :class="{error: $v.event.title.$error}"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p 
          v-if="!$v.event.category.required"
          class="errorMessage"
        >
          Обязательное поле.
        </p>
      </template>

      <BaseInput label="Место жительства" 
        v-model="event.location" type="text" 
        placeholder="Место жительства"
        class="field"
        :class="{error: $v.event.location.$error}"
        @blur="$v.event.location.$touch()"
      />

      <template v-if="$v.event.title.$error">
        <p 
          v-if="!$v.event.title.required"
          class="errorMessage"
        >
          Обязательное поле.
        </p>
      </template>

      <BaseInput label="Комментарии" 
        v-model="event.description" type="text" 
        placeholder="Комментарии"
        class="field"
        :class="{error: $v.event.description.$error}"
        @blur="$v.event.description.$touch()"
      />

      <template v-if="$v.event.description.$error">
        <p 
          v-if="!$v.event.description.required"
          class="errorMessage"
        >
          Обязательное поле.
        </p>
      </template>

      <BaseSelect 
        label="Категория"
        :options="categories"
        v-model="event.category"
        :class="{error: $v.event.category.$error}"
        @blur="$v.event.category.$touch()" 
      />

      <template v-if="$v.event.location.$error">
        <p 
          v-if="!$v.event.location.required"
          class="errorMessage"
        >
          Обязательное поле.
        </p>
      </template>

      <div class="Дата">
        <label>Дата приема</label>
        <datepicker
          v-model="event.date"
          placeholder="Выбрать дату"
          :input-class="{ error: $v.event.date.$error }"
          @opened="$v.event.date.$touch()"
          
        />
      </div>

      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Обязательное поле.
        </p>
      </template>

      <BaseSelect
        label="Время приёма"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />

      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Обязательное поле.
        </p>
      </template>

      <BaseButton 
        type="submit" 
        :disabled="$v.$anyError"
      >
      <i class="material-icons">add</i>
      </BaseButton>

    </form>
  </div>
</template>


<script>
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import {required} from 'vuelidate/lib/validators'

export default {
  components: {
    Datepicker,
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  validations: {
    event: {
      category: {required},
      title: {required},
      description: {required},
      location: {required},
      date: {required},
      time: {required}
    }
  },

  methods: {
    createEvent() {
      this.$v.$touch()
      if(!this.$v.$invalid) {
        NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          NProgress.done()
        })
      }
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
      }
    }
  },
  mounted() {
    $(document).ready(function() {
    $(".selected").formSelect();
  });
  },
}


</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
