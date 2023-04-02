<template>
  <div>
  <el-container>
    <el-aside width="15vw">
      <Aside/>
    </el-aside>

  <el-container >
    <el-header >
      <Header />
    </el-header>
    <el-main>
      <div class="main" style="width: 80vw">
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