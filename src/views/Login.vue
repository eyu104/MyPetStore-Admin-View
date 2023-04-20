<template>
    <div id="poster">
        <el-form class="login-container"
                 label-position="left"
                 label-width="0px"
                 :model="loginForm"
                 ref="loginForm">
            <h3 class="login_title">
                系统登陆
            </h3>
            <el-form-item label="">
                <el-input  type="text" v-model="loginForm.username" autocomplete="off" placeholder="账号" class="my-input"></el-input>
            </el-form-item>
                       <el-form-item label="">
                <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码" class="my-input"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;background:#505458;border:none" v-on:click="Login()">登陆</el-button>
                <el-link :underline="false" @click="toRegister" type="warning">没账号？点我注册</el-link>
            </el-form-item>
        </el-form>
    </div>
  <div class="test" style="user-select: none">
    <el-dialog
        v-model="visible"
        title="验证"
        width="20%"
        :before-close="handleClose"
    >
    <drag-verify-img-chip
        ref="sss"
        :imgsrc="img[Math.floor(Math.random()*5) ]"
        :v-model:isPassing="isPassing"
        :showRefresh="SR"
        :barWidth="40"
        text="请按住滑块拖动"
        successText="验证通过"
        handlerIcon="el-icon-d-arrow-right"
        successIcon="el-icon-circle-check"
        refreshIcon="el-icon-refresh"
        @refresh="reimg"
        @passcallback="pass"
        align="center"
    >
    </drag-verify-img-chip>
    </el-dialog>
  </div>
</template>

<script>
import request from "../utils/request";
import { CartStore } from '../stores/cartN'
import dragVerifyImgChip from "../components/dragVerifyImgChip.vue";
import {accountStore} from "../stores/account";
const account=accountStore()
let img0="src/assets/images/code.jpg"
let img1="src/assets/images/code1.jpg"
let img2="src/assets/images/code2.jpg"
let img3="src/assets/images/code3.jpg"
let img4="src/assets/images/code4.jpg"
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      intervalId: null,
      img: [
        img0,
        img1,
        img2,
        img3,
        img4
      ],
      visible: false,
      t3: "src/assets/images/code.jpg",
      isPassing: false,
      SR: true,

    }
    },
  components:{
    dragVerifyImgChip,
  },
  methods: {
      Login() {
        if(this.loginForm.username!=='' && this.loginForm.password!='') {
          // this.$refs.sss.reset()
          if (this.isPassing === false) {
            this.visible = true;
            setTimeout(this.reimg, 100)
          }
          if (this.isPassing === true) {
            console.log('submit!', this.loginForm);
            request.get('/supplier/login', {
              params: {
                supplierAccountName: this.loginForm.username,
                password: this.loginForm.password,
              }
            }).then((resp) => {
              let data = resp.data;
              console.log(resp);
              console.log(data);
              if (resp.code !== "404") {
                this.loginForm = {};
                account.$patch({
                  suppId:data.suppId,
                  name:data.name,
                  status:data.status,
                  addr1:data.addr1,
                  addr2:data.addr2,
                  city:data.city,
                  state:data.state,
                  zip:data.zip,
                  phone:data.phone,
                  supplierAccountName:data.supplierAccountName,
                  password:data.password,
                  email:data.email,
                })
                this.$message({
                  message: '登陆成功!!!',
                  type: 'success'
                });
                this.$router.push({path: '/'})
                window.localStorage.setItem('token', resp.data.suppId)
              } else {
                this.$message(
                    {
                      type: "error",
                      message: resp.msg
                    }
                )
                setTimeout(this.handleReset(), 1000)

              }
            })
          }
        }else {
          this.$message({
            message: '请输入你的账号和密码',
            type: 'warning'
          });
        }
      },
      handleClose(){
        this.visible=false;
      },
      toRegister(){
        this.$router.push({path:'/Register'})
      },
      reimg() {
        this.$refs.sss.reset();
        console.log(123)
      },
      pass() {
        this.$message({
          message: "验证通过",
          type: "success"
        });
        console.log('通过')
        this.SR = false
        this.visible=false
        this.isPassing = true

      },
      handleReset(){
        this.$refs.sss.reset();
        this.SR=true;
        this.isPassing=false;

      },

    },

}
</script>

<style>
    #poster{
        background-position:center;
        height:75vh;
        background-size:cover;
    }
    body{
        margin:0px;
        padding:0px;
    }
    .login-container{
        border-radius:15px;
        background-clip:padding-box;
        margin:90px auto;
        width:350px;
        padding: 35px 35px 15px 35px;
        background:#fff;
        border:1px solid #eaeaea;
        box-shadow:0 0 25px #cac6c6;
    }
    .login_title{
        margin : 0px auto 40px auto;
        text-align:center;
        color:#505458;
    }

    .my-input{
      border: 2px solid #ffd04b;
      border-radius: 6px;
    }
</style>