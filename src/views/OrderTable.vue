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
      <el-table-column label="商品信息" align="center" prop="cardType"/>
      <el-table-column label="支付明细" align="center">
        <el-table-column prop="cardType" label="支付卡类型"/>
        <el-table-column prop="creditCard" label="卡号"/>
        <el-table-column prop="expiryDate" label="送达日期" />
      </el-table-column>
      <el-table-column label="账单地址" align="center">
        <el-table-column prop="billToFirstName" label="名" />
        <el-table-column prop="billToLastName" label="姓" />
        <el-table-column prop="billAddress1" label="地址1" />
        <el-table-column prop="billAddress2" label="地址2" />
        <el-table-column prop="billCity" label="城市" />
        <el-table-column prop="billState" label="省份" />
        <el-table-column prop="billZip" label="邮编" />
        <el-table-column prop="billCountry" label="国家" />
      </el-table-column>
      <el-table-column label="收货地址" align="center" width="700">
        <el-table-column prop="shipToFirstName" label="名" />
        <el-table-column prop="shipToLastName" label="姓" />
        <el-table-column prop="shipAddress1" label="地址1" />
        <el-table-column prop="shipAddress2" label="地址2" />
        <el-table-column prop="shipCity" label="城市" />
        <el-table-column prop="shipState" label="省份" />
        <el-table-column prop="shipZip" label="邮编" />
        <el-table-column prop="shipCountry" label="国家" />
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="240">
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
