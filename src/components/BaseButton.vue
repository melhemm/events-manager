<template>
  <div>
    <button v-on="$listeners" v-bind="$attrs"
      class="btn-floating btn-large waves-effect waves-light deep-purple darken-4" 
      :class="buttonClass">
      <slot />
    </button>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      buttonClass: {
        type: String
      }
    }
  }
</script>

