<template>

  <div style="padding: 10px">

    <div style="margin: 10px 0">

      <el-select v-model="form.category" class="m-2" placeholder="展现种类" style="width: 120px">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>

      <el-input  v-model="search" placeholder="请输入产品ID" style="width: 200px;margin-left: 10px" clearable></el-input>

      <el-button style="margin-left: 10px" @click="load">查询</el-button>

<!--      <el-button @click="addcategory" style="margin-left: 10px" >新增种类</el-button>-->

      <el-button @click="add" style="margin-left: 10px">新增商品</el-button>

    </div>

<!--    新增商品-->
    <el-dialog v-model="addVisible" title="新增商品" width="30%">
      <el-form model="form" label-width="120px">

        <el-form-item label="商品ID" >
          <el-input v-model="form.commodityId" style="width: 50%;"/>
        </el-form-item>

        <el-form-item label="产品ID" >
          <el-input v-model="form.productId" style="width: 50%;"/>
        </el-form-item>

        <el-form-item label="种类" >
          <el-select v-model="form.category" class="m-2" placeholder="请选择" style="width: 50%;">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="名称" >
          <el-input v-model="form.name" style="width: 50%;"/>
        </el-form-item>

        <el-form-item label="数量" >
          <el-input v-model="form.quantity" style="width: 50%;"/>
        </el-form-item>

        <el-form-item label="产品描述" >
          <el-input v-model="form.describe" style="width: 80%;"/>
        </el-form-item>

        <el-form-item label="商品描述" >
          <el-input v-model="form.describe2" style="width: 80%;"/>
        </el-form-item>

        <el-form-item label="供应商" >
          <el-input v-model="form.supplier" style="width: 80%;"/>
        </el-form-item>

        <el-form-item label="状态" >
          <el-input v-model="form.status" style="width: 30%;"/>
        </el-form-item>

        <el-form-item label="价格" >
          <el-input v-model="form.price" style="width: 30%;"/>
        </el-form-item>

        <el-form-item label="成本" >
          <el-input v-model="form.cost" style="width: 30%;"/>
        </el-form-item>


        <el-form-item label="图片" >

          <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              :action="datas.host"
              :before-upload="getPolicy"
              :on-success="handleUploadSuccess"
              :data="datas"
              list-type="picture"

          >
            <el-button type="default">上传图片</el-button>
            <template #tip>
              <div class="el-upload__tip">
                图片大小不得大于500kb
              </div>
            </template>
          </el-upload>

        </el-form-item>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="saveitem">确认</el-button>
      </span>
      </template>
    </el-dialog>

<!--   新增种类-->
<!--    <el-dialog v-model="categoryVisible" title="新增种类" width="30%">-->
<!--      <el-form :model="form" label-width="120px">-->

<!--        <el-form-item label="cateid" >-->
<!--          <el-input v-model="form.cateId" style="width: 50%;"/>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="catename" >-->
<!--          <el-input v-model="form.cateName" style="width: 50%;"/>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="图片" >-->

<!--          <Tesr />-->

<!--        </el-form-item>-->
<!--        <Tesr />-->

<!--      </el-form>-->
<!--      <template #footer>-->
<!--      <span class="dialog-footer">-->
<!--        <el-button @click="categoryVisible = false">取消</el-button>-->
<!--        <el-button type="primary" @click="savecategory">确认</el-button>-->
<!--      </span>-->
<!--      </template>-->
<!--    </el-dialog>-->

<!--    表格-->
    <el-table :data="tableData" style="width: 100%" max-height="70vh" stripe border>
      <el-table-column prop="itemId" label="商品ID" width="100" sortable/>
      <el-table-column prop="productId" label="产品ID" width="100" sortable/>
      <el-table-column prop="category" label="种类" width="100" />
      <el-table-column prop="quantity" label="数量" width="70" />
      <el-table-column prop="name" label="名称" width="130" />
      <el-table-column prop="descn" label="产品描述" />
      <el-table-column prop="attr1" label="商品描述" width="130"/>
      <el-table-column prop="supplier" label="供应商" width="80"/>
      <el-table-column prop="status" label="状态" width="80"/>
      <el-table-column prop="unitCost" label="成本" width="80"/>
      <el-table-column prop="listPrice" label="价格" width="80" />
      <el-table-column fixed="right" label="操作" width="170">

        <template #default="scope">

          <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>

          <el-popconfirm title="确定删除？" @confirm="handleDel(scope.row.itemId)">
            <template #reference>
              <el-button type="danger" >删除</el-button>
<!--              <el-button type="danger" @click="handleDel(scope.$index, scope.row)" >删除</el-button>-->
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>

<!--    编辑商品-->
    <el-dialog v-model="editVisible" title="编辑商品" width="30%">
      <el-form model="form" label-width="120px">

        <el-form-item label="商品ID" >
          <el-input v-model="form.commodityId" style="width: 50%;"/>
        </el-form-item>

        <el-form-item label="产品ID" >
          <el-input v-model="form.productId" style="width: 50%;"/>
        </el-form-item>

        <el-form-item label="种类" >
          <el-select v-model="form.category" class="m-2" placeholder="请选择" style="width: 50%;">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="名称" >
          <el-input v-model="form.name" style="width: 50%;"/>
        </el-form-item>

        <el-form-item label="数量" >
          <el-input v-model="form.quantity" style="width: 50%;"/>
        </el-form-item>

        <el-form-item label="产品描述" >
          <el-input v-model="form.describe" style="width: 80%;"/>
        </el-form-item>

        <el-form-item label="商品描述" >
          <el-input v-model="form.describe2" style="width: 80%;"/>
        </el-form-item>

        <el-form-item label="供应商" >
          <el-input v-model="form.supplier" style="width: 80%;"/>
        </el-form-item>

        <el-form-item label="状态" >
          <el-input v-model="form.status" style="width: 30%;"/>
        </el-form-item>

        <el-form-item label="价格" >
          <el-input v-model="form.price" style="width: 30%;"/>
        </el-form-item>

        <el-form-item label="成本" >
          <el-input v-model="form.cost" style="width: 30%;"/>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              :action="datas.host"
              :before-upload="getPolicy"
              :on-success="handleUploadSuccess"
              :data="datas"
              list-type="picture"

          >
            <el-button type="default">上传图片</el-button>
            <template #tip>
              <div class="el-upload__tip">
                图片大小不得大于500kb
              </div>
            </template>
          </el-upload>
        </el-form-item>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="saveedit">确认</el-button>
      </span>
      </template>
    </el-dialog>

<!--    分页-->
    <div style="margin: 10px 0">
      <el-pagination
          :current-page="currentPage"
          :page-size="pageSize"
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

<script lang="ts">
import request from '../utils/request';
export default {
  name: "productsTable",
  cateId:'',
  cateName:'',

  data() {
    return {
      form:{},
      form2:{},
      tableData:[],
      FilterTableData:[],
      addVisible : false,
      categoryVisible: false,
      editVisible: false,
      a:[],
      search: '',

      currentPage: 1,
      pageSize: 10,
      total: 0,

      options : [
        {
          value: 'CATS',
          label: '宠物猫',
        },
        {
          value: 'DOGS',
          label: '宠物狗',
        },
        {
          value: 'BIRDS',
          label: '宠物鸟',
        },
        {
          value: 'FISH',
          label: '宠物鱼',
        },
        {
          value: 'REPTILES',
          label: '宠物爬行类',
        },
      ]

    }
  },

  created() {
    this.load()
  },

  methods: {


    handleDel(itemId){
      console.log(itemId)
      request.delete(""+itemId).then(res =>{
        if(res.code==='0')
                {this.$message({
                  type:'success',
                  message:'删除成功'
                })
                  this.load();
                }
                else
                {
                  this.$message({
                    type:'error',
                    message:res.msg
                  })
                }
      })
    },

    add(){
      this.addVisible=true
      this.form={}
    },

    // addcategory(){
    //   this.categoryVisible=true
    // },
    //
    // savecategory(){
    //   console.log(this.form)
    //   request.post("category/add",this.form).then(res =>{
    //     console.log(res)
    //   })
    //   this.categoryVisible=false
    // },

    saveitem(){
      console.log(this.form)
      request.post("/item/add",this.form).then(res =>{
        console.log(res)
        this.load()
      })
      this.addVisible=false
    },

    saveedit(){
      console.log(this.form)
      request.post("/item/update",this.form).then(res =>{
        console.log(res)
        this.load();
      })
      this.editVisible=false
    },


    handleEdit(row){
      this.form=JSON.parse(JSON.stringify(row));
      console.log(this.form);
      this.editVisible=true;
    },

    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.load()
    },

    handleCurrentChange(pageNum){
      this.currentPage = pageNum
      this.load()
    },

    load() {
      request.get('/item/get', {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          supplier: 1,
          search: this.search,
        }
      }).then(resp => {
        // var b=["",""]
        this.tableData = resp.data.records;
        // b= this.tableData.descn.split(">");
        // this.tableData.descn=b[1];
        this.total=resp.data.total;

      })

    },

    }


}

</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const findSize = (val: number) => {
  console.log(`${val} items per page`)
}
const findPage = (val: number) => {
  console.log(`current page: ${val}`)
}

// 图片
// import request from '../utils/request'
import uuid from '../utils/uuid'
import { onMounted } from 'vue'
const datas = ref({
  OSSAccessKeyId: '',
  policy: '',
  signature: '',
  key: '',
  success_action_status: '200',
  host: 'https://pstore-eyu104.oss-cn-guangzhou.aliyuncs.com',
  dir: ''
})
const fileName = ref('')
const id = ref('')

const fileList = ref([

])

onMounted(()=>{
  load()
})


const handleUploadSuccess = (res,file) => {
  console.log('上传成功')
  console.log(datas.value.host + '/' + sessionStorage.getItem('name'))
  fileList.value.pop()
  fileList.value.push({
    name: file.name,
    url: datas.value.host + '/' + sessionStorage.getItem('name')

  })
  load()
}

const load = () =>{
  request.get('/oss/policy').then(res=>{
    datas.value.policy = res.data.policy;
    datas.value.dir = res.data.dir;
    datas.value.host = res.data.host;
    datas.value.signature = res.data.signature;
    datas.value.OSSAccessKeyId = res.data.accessId;
    datas.value.key = res.data.dir + getId() + '_' + "${filename}"
  })
}

const getId = () => {
  let id = uuid(4)
  console.log(id)
  return id
}

const getPolicy = (file) => {
  sessionStorage.setItem("name",datas.value.key.replace("${filename}",file.name))
}

</script>


<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>