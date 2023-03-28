<template>
  <div>
  <el-container>
    <el-aside width="20vw">
      <Aside/>
    </el-aside>

  <el-container style="width: 60%">
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <div class="main">
        <RouterView />
      </div>
    </el-main>
  </el-container>
  </el-container>
  </div>
</template>

<script>

import  Header  from '../components/Header.vue'
import Aside from  '../components/Aside.vue'
export default {
  name: "Layout",
  components:{
    Header,
    Aside
  }
}
</script>

<style scoped>

</style>