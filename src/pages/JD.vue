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
                                    <div class="itemInfo" v-if="goodsInfo" >
                                        <el-row justify="center" >
                                        <div class="img" :style="{borderRadius:`var(--el-border-radius-base)`, boxShadow: `var(--el-box-shadow-lighter)`}">
                                         <img  :style="{borderRadius:`var(--el-border-radius-base)`}"  :src="goodsInfo.img" :alt="goodsInfo.title">
                                        </div>
                                        <span class="title"  ><span>{{goodsInfo.title}}</span></span >
                                        <span class="price" style="color:red" ><span >{{goodsInfo.label}}：{{goodsInfo.price[goodsInfo.price.length-1]}}</span></span>
                                        <span class="href"><a :href="goodsInfo.href">立即前往</a></span>
                                        </el-row>
                                    </div>
                        </div>
                        <div class="chartbox" >
                            <el-row justify="center" >
                                <div id="chart" :style="{borderRadius:`var(--el-border-radius-base)`, boxShadow: `var(--el-box-shadow-lighter)`}">

                                </div>
                                <div class="goodsevaluate"  :style="{borderRadius:`var(--el-border-radius-base)`, boxShadow: `var(--el-box-shadow-lighter)`}"> 
                                    <el-scrollbar >
                                        <div class="comment-item"  v-for="item in evaluate" :key="item.id" :style="{borderRadius:`var(--el-border-radius-base)`, boxShadow: `var(--el-box-shadow-lighter)`}">
                                           
                                            <p style="margin-left:8px"> {{item.content}}</p>
                                            <div class="pic-list" >
                                                <el-row justify="star" >
                                                    <div class="img" v-for="imgs in item.images" :key="imgs.id" :style="{borderRadius:`var(--el-border-radius-base)`, boxShadow: `var(--el-box-shadow-lighter)`}">
                                                        <a  @click="setEnlarge($event)">
                                                            <img :src="imgs.imgUrl" >
                                                        </a>                                                       
                                                    </div>                                                    
                                                </el-row>                                                
                                            </div>
                                            <div class="pic-view-wrap">
                                                <img >
                                            </div>
                                           
                                            
                                        </div>
                                            <el-button color='#F5F7FA' type="primary" style="width:100%" @click="load" > 加载更多</el-button>
                                    </el-scrollbar>
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
import {  ref} from '@vue/runtime-core'
import axios from 'axios'
export default {
    components:{navfrom},
    setup(){
        
        const route = useRoute()
        const goodsInfo=ref()
        const evaluate=ref([])
        // @ts-ignore
      
        const pag=ref(1)
        const load=async ()=>{
            pag.value++
            axios.get('/api/v2/getPagination',{
               params:{
                   id:route.query.id,
                   pageIndex:pag.value
               }
           }).then(async(res)=>{
               const data = res.data.evaluate
                 evaluate.value.push(...data)
           })
        }
                       
        const  getInfo  = async()=>{
            const {data}=await axios.get('/api/v2/goodsInfo',{
             params:{
                 id:route.query.id
             }})
             console.log(data);
             return data

        }
      getInfo().then(async(res)=>{
             goodsInfo.value= await res.goodsInfo
             evaluate.value=await res.evaluate
            runChart(goodsInfo)
             return
        })
 
      
        function runChart(data) { 
            const  option ={
                title:{
                    text:"商品价格变动"
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


        function  setEnlarge(event){
            const el=event.currentTarget.firstElementChild
            const src=el.src
            const regex=/(?<=[//]img30.360buyimg.com[/]n0[/])\w+/
            const enlarge=event.currentTarget.parentElement.parentElement.parentElement.nextSibling.firstElementChild
            const img = document.createElement("img")
            if (enlarge.src===src.replace(regex,'s616x405_jfs')) {                
                enlarge.parentNode.appendChild(img)
                enlarge.parentNode.removeChild(enlarge)
                return
            }else          
           {   
               enlarge.src= src.replace(regex,'s616x405_jfs')}
        }  
        
        return {goodsInfo,evaluate,load,setEnlarge}   
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

.chartbox .goodsevaluate{
    height: 350px;
    width: 1040px;;
    margin-top: 10px;
}
.comment-item{
    width: 1038px;;
    font-size: 14px;
    line-height: 180%;
    color: rgb(0, 0, 0);
}
.comment-item .pic-list{

    width: 100%;
    margin-top: 28px;
}
.comment-item .pic-list .img{
    margin-bottom:10px;
    margin-left: 10px;
    border: #FAFCFF;
}
.comment-item .pic-list .img img{
    height: 100%;
    width: 100%;
    
    
}
</style>