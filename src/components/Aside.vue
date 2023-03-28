<template>
  <el-row class="tac">
    <el-col :span="24" style="background-color: #1F8D94B3">
      <div style="color: white;text-align: center">
      <h2><b>Pet</b>&nbspStore Admin</h2>
      </div>
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          style="height: 85vh"
          background-color="#1F8D94B3"
          text-color="white"
          active-text-color="white"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>表格列表</span>
          </template>
            <el-menu-item index="1-1">用户列表</el-menu-item>
            <el-menu-item index="1-2">账单列表</el-menu-item>
            <el-menu-item index="1-3">商品列表</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><setting /></el-icon>
          <span>设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
