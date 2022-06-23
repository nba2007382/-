<template>
        <div class="section">
          <div class="wrapper">
              <div class="side"></div>
              <div class="content">
                  <div class="mod">
                      <h2>每日推荐
                      </h2>
                      <div class="albums">
                          <ul v-if="listData">
                            <li v-for="item in listData.data" :key="item.housedel_id"  class="move" >
                              <div v-if="item.housedel_id" >
                                 <a :href="item.href">
                              <div class="pic">                               
                                  <img :src="item.img" :alt="item.title">                               
                              </div>
                              <p>{{item.title}}</p>
                              </a>
                              <span>{{item.price}} 万</span>
                              </div>
                            
                              <div v-if="item.id"  >
                                 <a :href="item.url">
                              <div class="pic">                               
                                  <img :src="item.cover" :alt="item.title">                               
                              </div>
                              <p>{{item.title}}</p>
                              </a>
                              <span>{{item.rate}} 分</span>
                              </div>

                            </li>
                        </ul>
                      </div>
                      <div class="notes " >
                          <div :id="idName[0]" class="chart move"></div>
                          <div :id="idName[1]" class="chart move"></div>
             
                      </div>
                  </div>

              </div>
          </div>
      </div>
</template>

<script lang="ts">
import * as echarts from "echarts";
import { onMounted,getCurrentInstance} from '@vue/runtime-core';
export default {

  props:{
    idName:Array,
    listData:Array,
    option1:{type:Object},
    option2:{type:Object},

  },
    setup(props){

const {proxy}=getCurrentInstance()
onMounted(()=>{
  proxy.$nextTick(()=>{
    let waitChart= setInterval(()=>{
        if (props.option1&&props.option2) {
          let myChart=echarts.init(document.getElementById(props.idName[0]));
          let myChart2=echarts.init(document.getElementById(props.idName[1]));  
                  myChart.setOption(props.option1);
                  myChart2.setOption(props.option2)
                 clearInterval(waitChart)
        }
    },500)
  
   
  })
})
//         let option = reactive({
//         title: {
//           text: ''
//         },
//         tooltip: {},
//         legend: {
//           data: []
//         },
//         xAxis: {
//           data:[]
//         },
//         yAxis: {
//           name:''
//         },
//         series: [
//           {
//             name: '',
//             type: 'bar',
//             data:[]
//           }
//         ]
//       }
// )
//         let option2=reactive( {
//                   legend: {
//                   data:[]},
//                   xAxis:{type: 'category',   // 还有其他的type，可以去官网喵两眼哦
//                            data:[] ,//X轴坐标密码
//                                     // x轴名称样式
//                           nameTextStyle: {
//                                 fontWeight: 600,
//                             fontSize: 18
//                 }},
//                   yAxis: {
//                       type: 'value',
//                       name: '',   // y轴名称
//                                     // y轴名称样式
//                       nameTextStyle: {
//                       fontWeight: 600,
//                       fontSize: 18
//                   }
//                   },
//                   label: {},
//                   tooltip: {
//                      trigger: 'axis'   // axis   item   none三个值
//                   },
//                   series: []
//                 }
// )

 return{}
    }
}
</script>

<style scoped>
.chart{
flex: 1;
}
.section{
    
    width: 100vw;
    padding: 10px;
    min-height:100px;
    margin-bottom: 30px;
    

}
.section:nth-of-type(even){
    background-color: #f7f7f7;
}
.wrapper {
  width: 950px;
  height: 515.7px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
}
.section .main {
  overflow: hidden;
  zoom: 1;
}
.mod {
  height: 517px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  flex-wrap:wrap;
  float: left;
  
}
h2 {
  font: 15px Arial, Helvetica, sans-serif;
    line-height: normal;
  color: rgb(0, 0, 0);
  margin: 0 0 12px 20px;
  line-height: 150%;
}
.pl {
  font: 12px Arial, Helvetica, sans-serif;
  line-height: normal;
  line-height: 150%;
  color: #666666;
}
 .albums {
  width: 350px;
  margin-right: 30px;
  margin-left: 20px;
  color: rgb(255, 0, 0);
  font-size: 0;
  letter-spacing: -0.31em;
}
 .albums ul {
  margin: -10px 0 0 -10px;
  display: flex;
  flex-wrap: wrap;
}
.move{
  transition: all 0.5s;
}
.move:hover{
  transform: translateY(-5px);
}
 .albums li {
  display: inline-block;
  zoom: 1;
  letter-spacing: normal;
  word-spacing: normal;
  width: 170px;
  vertical-align: top;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
  font-size: 12px;
  margin: 10px 0 0 10px;
  }
 .albums .pic {
  display: inline-block;
  zoom: 1;
  width: 170px;
  height: 170px;
  overflow: hidden;
  vertical-align: middle;
  white-space: nowrap;
  }
  img{
    height: 100%;
    width: 100%;
  }
  a{
      text-decoration: none;
      color: black;
  }
  ul, ol {
    flex: 1;
    list-style: none;
  }
 .notes {
  width: 530px;
  height: 460px;
  zoom: 1;
  color: #666;
  margin-top: 35px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}
 .notes li {
  margin-top: 12px;
  word-wrap: break-word;
}
</style>