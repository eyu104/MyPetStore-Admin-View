<template xmlns:el-col="http://www.w3.org/1999/html">
  <div id="poster">
    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        label-position="right"
        class="register-container">
      <h3 class="register_title">
        系统注册
      </h3>
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item title="基本信息" name="1" >
          <el-form-item label="用户名" prop="supplierAccountName">
            <el-input
                type="text"
                autocomplete="off"
                v-model="ruleForm.supplierAccountName"
                placeholder="请输入用户名"
                prefix-icon="el-icon-user-solid"
                class="my-input"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                class="my-input"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
                type="password"
                v-model="ruleForm.checkPass"
                placeholder="请输入确认密码"
                prefix-icon="el-icon-lock"
                autocomplete="off"
                class="my-input"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
                type="text"
                autocomplete="off"
                v-model="ruleForm.email"
                prefix-icon="el-icon-user-solid"
                placeholder="请输入邮箱"
                class="my-input"
            ></el-input>
          </el-form-item>

        </el-collapse-item>


        <el-collapse-item title="详细信息" name="2">

          <el-form-item label="电话" prop="phone">
            <el-input
                type="text"
                v-model="ruleForm.phone"
                placeholder="请输入你的电话号码"
                prefix-icon="el-icon-lock"
                autocomplete="off"
                class="my-input"
                style="width: 90%"
            ></el-input>
          </el-form-item>

          <el-row :gutter="1">
            <el-form-item label="地址1" prop="addr1">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.addr1"
                    placeholder="请输入一号地址"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
            <el-form-item label="地址2" prop="addr2">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.addr2"
                    placeholder="请输入二号地址"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
          </el-row>

          <el-row :gutter="1">
            <el-form-item label="城市" prop="city">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.city"
                    placeholder="请输入你居住的城市"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
            <el-form-item label="省份" prop="state">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.state"
                    placeholder="请输入你居住的省份"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
          </el-row>

          <el-row :gutter="1">
            <el-form-item label="邮政编码" prop="zip">
              <el-col :span="25"><div class="grid-content bg-purple">
                <el-input
                    type="text"
                    v-model="ruleForm.zip"
                    placeholder="请输入邮政编码"
                    prefix-icon="el-icon-lock"
                    autocomplete="off"
                    class="my-input"
                ></el-input>
              </div></el-col>
            </el-form-item>
          </el-row>

        </el-collapse-item>

      </el-collapse>

      <el-form-item>
        <el-button type="primary" color="#505458" @click="submitForm(ruleForm)">注册</el-button>
        <el-button type="primary" color="#505458" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <el-link :underline="false" @click="toLogin" type="warning">已有账号？点我登陆</el-link>
    </el-form>
  </div>
</template>

<script>
import request from "../utils/request";
export default {
  name: 'Register',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };


    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (value==='') {
        return callback(new Error("邮箱不能为空"));
      }
      if (mailReg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱格式"));
      }
    };


    return {

      ruleForm: {
        name:'',
        status:'',
        addr1:'',
        addr2:'',
        city:'',
        state:'',
        zip:'',
        phone:'',
        supplierAccountName:'',
        password:'',
        email:'',
        checkPass: '',
      },


      rules: {
        supplierAccountName: [
          { required: true,message:"请输入你的名称", trigger: 'blur' },
          { min: 2,max:9,message:"长度2到9个字符", trigger: 'blur' },
        ],
        email: [
          { validator:checkEmail,trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {

    submitForm() {
          request.post('/supplier/add',this.ruleForm).then((resp)=>{
            console.log(this.ruleForm)
            console.log(resp);
            let data = resp.data;
            console.log(data);
            if(resp.code === "0"){
              this.ruleForm= {};
              this.$message({
                message: '恭喜你,注册成功,点击去登陆按钮进行登陆吧!!!',
                type: 'success'
              });
              this.$router.push('/login')
            }
          })

    },


    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin(){
      this.$router.push({path:'/Login'})
    }

  }

}
</script>


<style>
#poster{
  background-position:center;
  height:80vh;
  background-size:cover;
  margin:10px;
  padding:10px;
}


.register-container{
  border-radius:15px;
  background-clip:padding-box;
  margin:25px auto;
  width:600px;
  padding: 35px 35px 15px 35px;
  background:#fff;
  border:1px solid #eaeaea;
  box-shadow:0 0 25px #cac6c6;
}
.register_title{
  margin : 0px auto 40px auto;
  text-align:center;
  color:#505458;
}

.my-input{
  border: 2px solid #ffd04b;
  border-radius:6px;
}


</style>