<template>
  <div class="common-layout">
    <el-container>
      <el-header>
          <navfrom/>
      </el-header>
      <el-main>
           <el-row justify="center">
               <div class="box"   :style="{borderRadius:`var(--el-border-radius-base)`, boxShadow: `var(--el-box-shadow-lighter)`}">
                   <el-row justify="center" >
                        <div class="item" >
                                    <div class="itemInfo" v-if="houseInfo" >
                                        <el-row justify="center" >
                                        <div class="img" :style="{borderRadius:`var(--el-border-radius-base)`, boxShadow: `var(--el-box-shadow-lighter)`}">
                                         <img  :style="{borderRadius:`var(--el-border-radius-base)`}"  :src="houseInfo.img" :alt="houseInfo.title">
                                        </div>
                                        <span class="title"  ><span><h4> 房屋简介：</h4>{{houseInfo.title}}</span></span >
                                        <span class="price" style="color:red" ><span >价格：{{houseInfo.price[houseInfo.price.length-1]}}万元</span></span>
                                        <span class="href"><a :href="houseInfo.href">立即前往</a></span>
                                        </el-row>
                                    </div>
                        </div>
                        <div class="chartbox" >
                            <el-row justify="center" >
                                <div id="chart" :style="{borderRadius:`var(--el-border-radius-base)`, boxShadow: `var(--el-box-shadow-lighter)`}">

                                </div>

                            </el-row>

                        </div>
                       
                   </el-row>

               </div>
           </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import navfrom from'../components/navfrom.vue'
import * as echarts from "echarts";
import { useRoute } from 'vue-router'
import { ref} from '@vue/runtime-core'
import axios from 'axios'
export default {
    components:{navfrom},
    setup(){
    
        const route = useRoute()
        const houseInfo=ref()
                       
        const  getInfo  = async()=>{
            const {data}=await axios.get('/api/v2/houseInfo',{
             params:{
                 id:route.query.id
             }})
             console.log(data);
             return data

        }
      getInfo().then(async(res)=>{
             houseInfo.value= await res.houseInfo
            runChart(houseInfo)
             return
        })
 
      
        function runChart(data) { 
            const  option ={
                title:{
                    text:"房价价格变动"
                },
            xAxis: {
                type: 'category',
                data:  data.value.time
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                data:data.value.price,
                type: 'line',
                smooth: true
                }
            ]
            }
            const chartDom=document.getElementById('chart')
            const myChart = echarts.init(chartDom); 
           myChart.setOption(option)   
         }

        
        return {houseInfo}   
    }
}
</script>

<style scoped>
*{
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
            'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    line-height: 1.8;

}
.box{
    height: 800px;
    width: 1800px;
    border: 1px;
}
.item{
    height: 750px;
    width: 500px;
    border: 2px ;
    margin-top: 25px;
}
.chartbox{
    height: 750px;
    width: 1200px;
    margin-top: 25px;
}
.itemInfo .img{
    width: 400px;
    height: 300px;
    margin-top: 25px;
}
img{
    width: 100%;
    height: 100%;
}
.itemInfo .title{
    width: 400px;
    height: 100px;

    margin-top: 60px;
}
.itemInfo .price{
    width: 400px;
    height: 100px;
    margin-top: 60px;
}
.chartbox #chart{
    height: 350px;
    width: 1040px;
    margin-top: 25px;
}

</style>