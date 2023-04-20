<template>
  <div style="margin-bottom: 20px">
    <el-row>
      <el-col :span="3">
        <el-input v-model="search" placeholder="输入订单号" />
      </el-col>

      <el-col :span="2">
        <el-button @click="handleSearch">查询</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="handleReset">重置</el-button>
      </el-col>
    </el-row>
  </div>

  <div>
    <el-table :data="FilterTableData" border style="width: 100%" height="70vh">

      <el-table-column label="支付明细" align="center">
        <el-table-column prop="orderId" label="订单信息">
          <template #default="scope">
            <el-link @click="interOrder(scope.row)" underline="false">{{scope.row.orderId}}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="cardType" label="支付卡类型"/>
        <el-table-column prop="creditCard" label="卡号"/>
        <el-table-column prop="orderDate" label="送达日期" />
      </el-table-column>
      <el-table-column label="账单地址" align="center">
        <el-table-column prop="billToFirstName" label="名" />
        <el-table-column prop="billToLastName" label="姓" />
        <el-table-column prop="billAddr1" label="地址1" />
        <el-table-column prop="billAddr2" label="地址2" />
        <el-table-column prop="billCity" label="城市" />
        <el-table-column prop="billState" label="省份" />
        <el-table-column prop="billZip" label="邮编" />
        <el-table-column prop="billCountry" label="国家" />
      </el-table-column>
      <el-table-column label="收货地址" align="center" width="700">
        <el-table-column prop="shipToFirstName" label="名" />
        <el-table-column prop="shipToLastName" label="姓" />
        <el-table-column prop="shipAddr1" label="地址1" />
        <el-table-column prop="shipAddr2" label="地址2" />
        <el-table-column prop="shipCity" label="城市" />
        <el-table-column prop="shipState" label="省份" />
        <el-table-column prop="shipZip" label="邮编" />
        <el-table-column prop="shipCountry" label="国家" />
        <el-table-column prop="status" label="进度"/>
      </el-table-column>
      <el-table-column label="商品信息" align="center">
        <el-table-column label="总价" prop="totalPrice"/>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="240">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
          >编辑
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
          >删除
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
              title="修改订单"
              width="80%"
              :before-close="handleClose"
          >
            <el-form
                :model="ruleForm"
                ref="ruleForm"
                label-position="right"
            >
              <el-collapse v-model="activeNames" accordion>
                <el-collapse-item title="基本信息" name="1" >
                  <el-form-item label="订单编号" label-width="100px" prop="orderId">
                    <el-input
                        type="text"
                        autocomplete="off"
                        v-model="ruleForm.orderId"
                        placeholder="请输入订单编号"
                        prefix-icon="el-icon-user-solid"
                        class="my-input"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="支付卡类型" label-width="100px" prop="cardType">
                    <el-input
                        type="text"
                        autocomplete="off"
                        v-model="ruleForm.cardType"
                        placeholder="请输入支付卡类型"
                prefix-icon="el-icon-user-solid"
                class="my-input"
            ></el-input>
          </el-form-item>

          <el-form-item label="卡号" label-width="100px" prop="creditCard">
            <el-input
                type="text"
                v-model="ruleForm.creditCard"
                autocomplete="off"
                placeholder="请输入卡号"
                prefix-icon="el-icon-lock"
                class="my-input"
            ></el-input>
          </el-form-item>
          <el-form-item label="送达日期" label-width="100px" prop="orderDate">
            <el-input
                type="text"
                autocomplete="off"
                v-model="ruleForm.orderDate"
                prefix-icon="el-icon-user-solid"
                placeholder="请输入送达日期"
                class="my-input"
            ></el-input>
          </el-form-item>

        </el-collapse-item>


        <el-collapse-item title="账单地址" name="2">
          <el-row :gutter="1">
            <el-form-item label="名" label-width="100px" prop="billToFirstName">

              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.billToFirstName"
                    placeholder="请输入名字"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
            <el-form-item label="姓" label-width="100px" prop="billToLastName">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.billToLastName"
                    placeholder="请输入姓氏"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
          </el-row>

          <el-row :gutter="1">
            <el-form-item label="地址1" label-width="100px" prop="billAddress1">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.billAddr1"
                    placeholder="请输入一号地址"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
            <el-form-item label="地址2" label-width="100px"  prop="billAddress2">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.billAddr2"
                    placeholder="请输入二号地址"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
          </el-row>

          <el-row :gutter="1">
            <el-form-item label="城市" label-width="100px"  prop="billCity">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.billCity"
                    placeholder="请输入居住的城市"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
            <el-form-item label="省份" label-width="100px"  prop="billState">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.billState"
                    placeholder="请输入居住的省份"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
          </el-row>

          <el-row :gutter="1">
            <el-form-item label="邮政编码" label-width="100px"  prop="billZip">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.billZip"
                    placeholder="请输入邮政编码"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
            <el-form-item label="国家" label-width="100px"  prop="billCountry">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.billCountry"
                    placeholder="请输入国家"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
          </el-row>

        </el-collapse-item>

        <el-collapse-item title="收货地址" name="3">
          <el-row :gutter="1">
            <el-form-item label="名" label-width="100px" prop="shipToFirstName">

              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.shipToFirstName"
                    placeholder="请输入名字"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
            <el-form-item label="姓" label-width="100px" prop="shipToLastName">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.shipToLastName"
                    placeholder="请输入姓氏"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
          </el-row>

          <el-row :gutter="1">
            <el-form-item label="地址1" label-width="100px" prop="shipAddress1">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.shipAddr1"
                    placeholder="请输入一号地址"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
            <el-form-item label="地址2" label-width="100px"  prop="shipAddress2">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.shipAddr2"
                    placeholder="请输入二号地址"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
          </el-row>

          <el-row :gutter="1">
            <el-form-item label="城市" label-width="100px"  prop="shipCity">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.shipCity"
                    placeholder="请输入居住的城市"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
            <el-form-item label="省份" label-width="100px"  prop="shipState">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.shipState"
                    placeholder="请输入居住的省份"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
          </el-row>

          <el-row :gutter="1">
            <el-form-item label="邮政编码" label-width="100px"  prop="shipZip">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.shipZip"
                    placeholder="请输入邮政编码"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
            <el-form-item label="国家" label-width="100px"  prop="shipCountry">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.shipCountry"
                    placeholder="请输入国家"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save()">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
      v-model="dialogVisible1"
      title="订单信息"
      width="80%"
      :before-close="handleClose"
  >
    <div class="table" style="text-align: center;">
      <el-table :data="itemData"  border stripe style="width: 100%">
        <el-table-column prop="itemId" label="商品ID"  />
        <el-table-column prop="item.productId" label="产品ID" />
        <el-table-column prop="item.attr1" label="描述"  />
        <el-table-column prop="quantity" label="数量"  />
        <el-table-column prop="item.listPrice" label="标价"  />
        <el-table-column prop="total" label="总价" />
      </el-table>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import request from '../utils/request'
import {Search} from "@element-plus/icons-vue";

export default {

  data() {
    return {
      tableData: [],
      FilterTableData:[],
      itemData:[],
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
      dialogVisible1:false,
      search:'',
      supplierId:'',
      ruleForm:{
        orderId:1,
        username:'1',
        orderDate:'',
        shipAddr1:'',
        shipAddr2:'',
        shipCity:'',
        shipState:'',
        shipZip:'',
        shipCountry:'',
        billAddr1:'',
        billAddr2:'',
        billCity:'',
        billState:'',
        billZip:'',
        billCountry:'',
        courier:'',
        totalPrice:'',
        billToFirstName:'',
        billToLastName:'',
        shipToFirstName:'',
        shipToLastName:'',
        creditCard:'',
        expiryDate:'',
        cardType:'',
        locale:'',
        status:'P',
        lineItems:[],
      },

    }
  },
  created() {
    this.load();
  },

  methods:{
    interOrder(row){
      console.log(row.lineItems);
      this.itemData=row.lineItems;
      this.dialogVisible1=true;
    },
    load(){
      request.get('/order/get',{
        params:{
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          supplierId:window.localStorage.getItem("token"),
        }
      }).then(resp=>{
        console.log(resp);
        this.tableData=resp.data.records;
        this.FilterTableData=this.tableData.filter((data)=>data.status==='Q');
        this.tableData=this.FilterTableData;
        this.total=this.tableData.length;
      })
    },
    save(){
      request.post('/order/update',this.ruleForm).then(resp=>{
        if(resp.code==='0')
        {this.$message({
          type:'success',
          message:'更新成功'
        })
          this.load();
          this.dialogVisible=false;
        }
        else
        {
          this.$message({
            type:'error',
            message:resp.msg
          })
        }
      })
    },
    handleEdit(row){
      this.ruleForm=JSON.parse(JSON.stringify(row));
      console.log(this.ruleForm);
      this.dialogVisible=true;
    },
    handleDelete(row){
      this.ruleForm=JSON.parse(JSON.stringify(row));
      request.get('/order/delete',{
        params:{
          orderId: row.orderId
        }
      }).then(resp=>{
        if(resp.code==='0')
        {this.$message({
          type:'success',
          message:'删除成功'
        })
          this.load();
          this.dialogVisible=false;
        }
        else
        {
          this.$message({
            type:'error',
            message:resp.msg
          })
        }
      })
    },
    handleSearch()
    {
      let num=parseInt(this.search);
      this.FilterTableData=this.tableData.filter((data)=>data.orderId===num)
    },
    handleReset()
    {
      this.FilterTableData=this.tableData;
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
      this.dialogVisible=false;
      this.dialogVisible1=false;
    }
  },

}
</script>
