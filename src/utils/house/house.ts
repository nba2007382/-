import axios from "axios";
import { reactive, ref } from "vue";

interface HouseChart{
    data: {
        chart1: {
        name: any;
        
        unprice: any;
    }[];
        chart2: {
        name: string;
        time: any;
        unprice: any;
    }[];
};
}
interface Option1{
    title: {
        text: string;
    };
    tooltip: {};
    legend: {
        data: string[];
    };
    xAxis: {
        data: any;
    };
    yAxis: {
        name: string;
    };
    series: {
        name: string;
        type: string;
        data: any;
    }[];
}

interface Option2{
    legend: {
        data: any[];
    };
    xAxis: {
        type: string;
        data: any[];
        nameTextStyle: {
            fontWeight: number;
            fontSize: number;
        };
    };
    yAxis: {
        type: string;
        name: string;
        nameTextStyle: {
            fontWeight: number;
            fontSize: number;
        };
    };
    label: {
    };
    tooltip: {
        trigger:string
    };
    series: any[];
}
interface HouseList{}[]

async function gethouseChart(){
    let houseChart:HouseChart={ data: {
        chart1: [
            {name: null,
            unprice: null
            }
        ],
        chart2: [
            {
                name:'' ,
                time: null,
                unprice: null
            },
            {
                name: '',
                time: null,
                unprice: null
            },
            {
                name: '',
                time: null,
                unprice: null
            }
        ]
    }}
    let Option1:Option1 = {
        title: {
          text: '今日房价'
        },
        tooltip: {},
        legend: {
          data: ['房价']
        },
        xAxis: {
          data:null
        },
        yAxis: {
          name:'千/平方米'
        },
        series: [
          {
            name: '房价',
            type: 'bar',
            data:null
          }
        ]
      }
    
    let Option2:Option2= {
                  legend: {
                  data:[]},
                  xAxis:{type: 'category',   // 还有其他的type，可以去官网喵两眼哦
                           data:[] ,//X轴坐标密码
                                    // x轴名称样式
                          nameTextStyle: {
                                fontWeight: 600,
                            fontSize: 18
                }},
                  yAxis: {
                      type: 'value',
                      name: '千/平方米',   // y轴名称
                                    // y轴名称样式
                      nameTextStyle: {
                      fontWeight: 600,
                      fontSize: 18
                  }
                  },
                  label: {},
                  tooltip: {
                     trigger: 'axis'   // axis   item   none三个值
                  },
                  series: []
                }
    
    let list:HouseList=[]
    
    await axios.get('/api/showlist/house').then((res)=>{
            list=res.data
        })
    await axios.get('/api/chart/house').then((res)=>{     
            houseChart.data=res.data.data
            Option1.xAxis.data=houseChart.data .chart1[0].name
            Option1.series[0].data=houseChart.data.chart1[0].unprice
            Option2.legend.data=houseChart.data .chart1[0].name
            Option2.xAxis.data=houseChart.data .chart2[0].time
            for (let i = 0; i < houseChart.data .chart2.length; i++) {
                const el = houseChart.data .chart2[i];
                Option2.series[i]={
                name:el.name,
                data:el.unprice,
                type:'line'
            }
        }    
        })
        return {Option1,Option2,list}
}
let houseOption1=ref()
let houseOption2=ref()
let houseList=ref()
 gethouseChart().then((res)=>{
    const {Option1,Option2,list}=res
    houseOption1.value=Option1
    houseOption2.value=Option2
    houseList.value=list         
})
export {houseOption1,houseOption2,houseList}



