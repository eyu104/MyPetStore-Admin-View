<script >

export default {
  name:"App",
}

</script>

<template>

  <div>

    <RouterView :key="$route.fullPath" />

  </div>

</template>

<style scoped>


</style>
