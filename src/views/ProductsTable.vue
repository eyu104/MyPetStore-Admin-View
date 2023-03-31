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

      <el-input  v-model="search" placeholder="请输入关键字" style="width: 30%;margin-left: 10px"></el-input>

      <el-button style="margin-left: 10px">查询</el-button>

      <el-button @click="addcategory" style="margin-left: 10px" >新增种类</el-button>

      <el-button @click="add" style="margin-left: 10px">新增商品</el-button>

    </div>


<!--    新增商品-->
    <el-dialog v-model="addVisible" title="新增商品" width="30%">
      <el-form model="form" label-width="120px">

        <el-form-item label="商品ID" >
          <el-input v-model="form.commodityID" style="width: 50%;"/>
        </el-form-item>

        <el-form-item label="产品ID" >
          <el-input v-model="form.productID" style="width: 50%;"/>
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

        <el-form-item label="描述" >
          <el-input v-model="form.describe" style="width: 80%;"/>
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
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>

        </el-form-item>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="addVisible = false">确认</el-button>
      </span>
      </template>
    </el-dialog>

<!--   新增种类-->
    <el-dialog v-model="categoryVisible" title="新增种类" width="30%">
      <el-form :model="form" label-width="120px">

        <el-form-item label="cateid" >
          <el-input v-model="form.cateid" style="width: 50%;"/>
        </el-form-item>

        <el-form-item label="catename" >
          <el-input v-model="form.catename" style="width: 50%;"/>
        </el-form-item>

        <el-form-item label="图片" >

          <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>

        </el-form-item>

      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="categoryVisible = false">取消</el-button>
        <el-button type="primary" @click="categoryVisible = false">确认</el-button>
      </span>
      </template>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" max-height="100vh" stripe border>
      <el-table-column prop="commodityID" label="商品ID" width="120" sortable/>
      <el-table-column prop="productID" label="产品ID" width="120" sortable/>
      <el-table-column prop="category" label="种类" width="120" />
      <el-table-column prop="name" label="名称" width="120" />
      <el-table-column prop="describe" label="描述" />
      <el-table-column prop="supplier" label="供应商" width="180"/>
      <el-table-column prop="status" label="状态" width="150"/>
      <el-table-column prop="cost" label="成本" width="120"/>
      <el-table-column prop="price" label="价格" width="120" />
      <el-table-column fixed="right" label="操作" width="180">

        <template #default="scope">

          <el-button type="primary" @click="edit"  >编辑</el-button>

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


<!--    编辑商品-->
    <el-dialog v-model="EditVisible" title="编辑商品" width="30%">
      <el-form model="form" label-width="120px">

        <el-form-item label="商品ID" >
          <el-input v-model="form.commodityID" style="width: 50%;"/>
        </el-form-item>

        <el-form-item label="产品ID" >
          <el-input v-model="form.productID" style="width: 50%;"/>
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

        <el-form-item label="描述" >
          <el-input v-model="form.describe" style="width: 80%;"/>
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
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>

        </el-form-item>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="EditVisible = false">取消</el-button>
        <el-button type="primary" @click="EditVisible = false">确认</el-button>
      </span>
      </template>
    </el-dialog>

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

<script lang="ts">

export default {
  name: "productsTable",
  cateid:'',
  catename:'',

  data() {
    return {
      form:{},

      addVisible : false,
      categoryVisible: false,
      EditVisible: false,

      search: '',

      currentPage: 1,

      total: 10,

      tableData: [
        {
          commodityID: 'asd',
          productID: 'zxc',
          category:'',
          name:'',
          cost:'',
          supplier:'',
          status:'',
          describe: 'No. 189, Grove St, Los Angeles',
          price: '1000',
        },

        {
          commodityID: 'asd',
          productID: 'zxc',
          category:'',
          name:'',
          cost:'',
          supplier:'',
          status:'',
          describe: 'No. 189, Grove St, Los Angeles',
          price: '1000',
        },

      ],

      options : [
        {
          value: 'cat',
          label: '宠物猫',
        },
        {
          value: 'dog',
          label: '宠物狗',
        },
        {
          value: 'bird',
          label: '宠物鸟',
        },
        {
          value: 'fish',
          label: '宠物鱼',
        },
        {
          value: 'reptile',
          label: '宠物爬行类',
        },
      ]


    }
  },


  methods: {
    handleDel: '',

    handleSizeChange() {

    },

    handleCurrentChange() {

    },

    add(){
      this.addVisible=true
    },

    addcategory(){
      this.categoryVisible=true
    },

    edit(){
      this.EditVisible=true
    }
  }
}

</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
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