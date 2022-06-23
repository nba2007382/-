<template>

    <nav>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1" > <router-link to="/">首页</router-link></el-menu-item>
    <el-menu-item index="2"  ><router-link to="/Steward">管家</router-link></el-menu-item>  
   <el-menu-item index="3"  ><router-link to="/wb">微博</router-link></el-menu-item>  
    <el-menu-item v-if="!userEmail" @click="display()" index="4" style="right:50px;position:absolute;border-radius: 15px;  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);">登陆</el-menu-item>  
 
      <el-sub-menu v-if="userEmail" index="5" style="right:50px;position:absolute;border-radius: 15px;  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);">
          <template #title> {{userName}}</template>
          <el-menu-item index="5-1">{{userEmail}}</el-menu-item>
        <el-menu-item @click="loginOut();router.push('/')" index="5-2">退出登陆</el-menu-item>
      </el-sub-menu>

  </el-menu>
          <loginfrom v-if="num" style="margin-top:20%;margin-left:50%;transform:translate(-50%,-50%)"/>

    </nav>

</template>

<script lang="ts">
import loginfrom from './loginfrom.vue'
import{computed,ref,} from'vue'
import router from '../router';
import {user} from'../store/user'
import axios from 'axios';
export default {
components:{loginfrom},
setup(){
    const userstore=user()

    const userName=computed(()=>userstore.userInfo.name)
    const userEmail=computed(()=>userstore.userInfo.email)
    const num=ref(false)
    const display=()=>{
        num.value=!num.value
    }
    const loginOut=()=>{
        userstore.removeToken()
        userstore.removeuserInfo()

    }
    axios.get('/api/check/login')
    return{num,display,loginOut,userName,userEmail,router}
}
}
</script>

<style scoped>


</style>