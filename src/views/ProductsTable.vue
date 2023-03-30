<template>

  <div style="padding: 10px">

    <div style="margin: 10px 0">
      <el-input  v-model="search" placeholder="请输入" style="width: 30%"></el-input>
      <el-button style="margin-left: 10px">查询</el-button><el-button>新增</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" max-height="100vh" stripe border>
      <el-table-column prop="commodityID" label="商品ID" width="200" sortable/>
      <el-table-column prop="productID" label="产品ID" width="200" sortable/>
      <el-table-column prop="describe" label="描述" />
      <el-table-column prop="price" label="价格" width="180" />
      <el-table-column fixed="right" label="操作" width="180">

        <template #default="scope">

          <el-button type="primary" @click="handleEdit(scope.$index,scope.row)"  >编辑</el-button>

          <el-popconfirm
              confirm-button-text="是"
              cancel-button-text="否"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="确定删除？"
          >
            <template #reference>
              <el-button type="danger" @click="handleDel(scope.$index,scope.row)" >删除</el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
          :current-page="currentPage"
          :page-size="10"
          :page-sizes="[5, 10, 20]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>

  </div>

</template>

<script>

import {Search} from '@element-plus/icons-vue';
export default {
  name: "productsTable",


  data() {
    return {

      search: '',

      currentPage: 1,

      total: 10,

      tableData: [
        {
          commodityID: 'asd',
          productID: 'zxc',
          describe: 'No. 189, Grove St, Los Angeles',
          price: '1000',
        },

        {
          commodityID: 'asd',
          productID: 'zxc',
          describe: 'No. 189, Grove St, Los Angeles',
          price: '1000',
        },

      ]
    }
  },
  methods: {
    handleDel: '',

    handleEdit: '',

    handleSizeChange() {

    },

    handleCurrentChange() {

    }
  }
}



</script>

<style scoped>

</style>