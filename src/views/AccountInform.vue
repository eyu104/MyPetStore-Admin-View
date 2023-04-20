<template>
  <div class="info-container" >
  <el-descriptions title="用户个人信息" direction="vertical" :column="4" border>
    <el-descriptions-item label="用户名" :span="4">{{supplierAccountName}}</el-descriptions-item>
    <el-descriptions-item label="邮箱" :span="4">{{email}}</el-descriptions-item>
    <el-descriptions-item label="电话" :span="4">{{phone}}</el-descriptions-item>
    <el-descriptions-item label="地址1" width="25%">{{addr1}}</el-descriptions-item>
    <el-descriptions-item label="地址2" width="25%">{{addr2}}</el-descriptions-item>
    <el-descriptions-item label="城市" :span="2">{{city}}</el-descriptions-item>
    <el-descriptions-item label="省份">{{state}}</el-descriptions-item>
    <el-descriptions-item label="邮编">{{zip}}</el-descriptions-item>

  </el-descriptions>
    <el-button @click="toEdit">修改个人信息</el-button>
    <el-button @click="toLog">查看订单日志</el-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {accountStore} from "../stores/account";
import { useRoute, useRouter } from 'vue-router'
import {storeToRefs} from "pinia";
const router = useRouter()
const route = useRoute()
const account = accountStore()
let {suppId,
  name,
  status,
  addr1,
  addr2,
  city,
  state,
  zip,
  phone,
  supplierAccountName,
  password,
  email,} = storeToRefs(account)
const toEdit = () => {
  router.push({
    path:'/edit',
    query: {
      ...route.query
    }
  })
}
const toLog = () => {
  router.push({
    path:'/OrderLog',
    query: {
      ...route.query
    }
  })
}

</script>

<style scoped>

.info-container{
  border-radius:15px;
  background-clip:padding-box;
  margin:5% auto;
  height: 65vh;
  width:60%;
  padding: 35px 35px 15px 35px;
  background:#fff;
  border:1px solid #eaeaea;
  box-shadow:0 0 25px #cac6c6;
}
</style>