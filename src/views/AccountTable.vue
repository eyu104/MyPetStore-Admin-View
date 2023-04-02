<template>
  <div style="margin-bottom: 20px">
  <el-row>
    <el-col :span="3">
  <el-input v-model="search" placeholder="输入关键值" />
    </el-col>

    <el-col :span="2">
      <el-button>查询</el-button>
    </el-col>
      <el-col :span="3">
        <el-button @click="dialogVisible = true">新增</el-button>
      </el-col>
  </el-row>
  </div>

  <div>
  <el-table :data="tableData" border style="width: 100%" height="70vh">
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="password" label="密码" width="180" />
    <el-table-column prop="Email" label="邮箱" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
        >Edit
        </el-button>
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
    <div style="margin-top: 20px">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>

  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import request from '../utils/request'

export default {

  data() {
    return {
      tableData: [],
      currentPage:1,
      pageSize:10,
      small:false,
      background:false,
      disabled:false,
      total:0,
      form:{
        username:'',
        password:'',
        Email:'',
      },
      dialogVisible:false,
      search:'',
    }
  },
  created() {
    this.load();
  },

  methods:{
    load(){

    },
    save(){

    },
    add(){

    },
    handleEdit(row){

    },
    handleDelete(){

    },
    handleSizeChange(pageSize)
    {
      this.pageSize=pageSize;
      this.load();
    },
    handleCurrentChange(currentPage)
    {
      this.currentPage=currentPage;
      this.load();
    },
    handleClose(){

    }
  },
}
</script>
