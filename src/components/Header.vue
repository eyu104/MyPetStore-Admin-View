<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  activeIndex.value = key
  console.log(key, keyPath)
}
</script>

<template>
  <div class="header">
    <el-affix :offset="0">
      <div style="width: 85vw;">
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            style="width: 75vw;"
            router
        >
          <!-- <div class="block1"> -->
          <el-menu-item index="home">首页</el-menu-item>
          <!-- </div> -->


          <div class="block2">

          </div>


          <el-menu-item index="3" class="l">
            About<el-icon><InfoFilled /></el-icon>
          </el-menu-item>


          <el-sub-menu index="2">
            <template #title>
              <el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
            </template>

            <div v-if="username===''">
              <el-menu-item index="login">登录</el-menu-item>
            </div>

            <div v-else>
              <el-menu-item index="5-1">个人信息</el-menu-item>
              <el-menu-item index="login" @click="account.$reset()">退出登录</el-menu-item>
            </div>
          </el-sub-menu>

          <!-- </div> -->


        </el-menu>
      </div>




    </el-affix>
  </div>


</template>

<style scoped>

.header {
  display: flex;
}

.block2 {
  width: 50vw;
  display: flex;
  margin: 0 0;
}


/* .header>.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid var(--el-menu-active-color);
    color: #295187;
} */
</style>