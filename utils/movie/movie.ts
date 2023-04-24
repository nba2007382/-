import axios from "axios"
import { reactive, ref } from "vue";

interface MovieChart{
    data: {
        chart1: {
        name: any;
        
        unrate: any;
    }[];
        chart2: {
        name: string;
        xname: any;
        rate: any;
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
async function getmovieChart(){

    let Chart:MovieChart={ data: {
        chart1: [
            {name: null,
            unrate: null
            }
        ],
        chart2: [
            {
                name:'' ,
                xname: null,
                rate: null
            },
            {
                name: '',
                xname: null,
                rate: null
            },
            {
                name: '',
                xname: null,
                rate: null
            }
        ]
    }}
    
    let Option1:Option1 = {
        title: {
          text: '豆瓣电影统计'
        },
        tooltip: {},
        legend: {
          data: ["评分"],
        },
        xAxis: {
          data:null
        },
        yAxis: {
          name:'分'
        },
        series: [
          {
            name: '平均分',
            type: 'bar',
            data:null
          }
        ]
      }
    
    let Option2:Option2=( {
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
                      name: '电影数量',   // y轴名称
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
    )
    
    let list=[]
    await axios.get('/api/showlist/movie').then((res)=>{
        list=res.data
    })
    await axios.get('/api/chart/movie').then((res)=>{
        Chart.data=res.data.data 
        const data=Chart.data   
        Option1.xAxis.data=data.chart1[0].name
        Option1.series[0].data=data.chart1[0].unrate
        Option2.legend.data=[data.chart2[0].name,data.chart2[1].name,data.chart2[2].name]
        Option2.xAxis.data=data.chart2[0].xname
        for (let i = 0; i < data.chart2.length; i++) {
            const el = data.chart2[i];
            Option2.series[i]={
                name:el.name,
                data:el.rate,
                type:'line'
            }
        }  
    })
    return {list, Option2, Option1}
}
let movieOption1=ref()
let movieOption2=ref()
let movieList=ref()
 getmovieChart().then((res)=>{
    const {Option1,Option2,list}=res
    movieOption1.value=Option1
    movieOption2.value=Option2
    movieList.value=list         
})


export {movieList, movieOption2, movieOption1}