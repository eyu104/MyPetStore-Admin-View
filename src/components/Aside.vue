<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {ref} from "vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  activeIndex.value = key
  console.log(key, keyPath)
}
</script>

<template>
  <el-row class="tac">
    <el-col :span="24" style="background-color: #1F8D94B3">
      <div style="color: white;text-align: center">
      <h2><b>Pet</b>&nbspStore Admin</h2>
      </div>
      <el-menu
          default-active="activeIndex"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          style="height: 85vh"
          background-color="#1F8D94B3"
          text-color="white"
          active-text-color="white"
          router
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>表格列表</span>
          </template>
            <el-menu-item index="accountTable">用户列表</el-menu-item>
            <el-menu-item index="orderTable">账单列表</el-menu-item>
            <el-menu-item index="productsTable">商品列表</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><setting /></el-icon>
          <span>设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    </el-row>
</template>

