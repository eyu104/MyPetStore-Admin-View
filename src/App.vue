<script >
export default {
  name:"App",
  created() {
    window.localStorage.clear()
  }
}

</script>

<template>

  <div>

    <RouterView :key="$route.fullPath" />

  </div>

</template>

<style scoped>


</style>
