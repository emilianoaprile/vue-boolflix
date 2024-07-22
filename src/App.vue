<script>

export default {
  data() {
    return {
      name: 'App.vue'
    }
  }

}
</script>
<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<style lang="scss">
@use './styles/general.scss';
@use './styles/partials/variables' as *;
@use './styles/partials/mixins' as *;
</style>