<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <navfrom />
            </el-header>
            <el-main>
                <el-row justify="center">
                    <div
                        class="box"
                        :style="{
                            borderRadius: `var(--el-border-radius-base)`,
                            boxShadow: `var(--el-box-shadow-lighter)`,
                        }"
                    >
                        <el-row justify="center">
                            <div class="item">
                                <div v-if="goodsInfo" class="itemInfo">
                                    <el-row justify="center">
                                        <div
                                            class="img"
                                            :style="{
                                                borderRadius: `var(--el-border-radius-base)`,
                                                boxShadow: `var(--el-box-shadow-lighter)`,
                                            }"
                                        >
                                            <img
                                                :style="{
                                                    borderRadius: `var(--el-border-radius-base)`,
                                                }"
                                                :src="goodsInfo.img"
                                                :alt="goodsInfo.title"
                                            />
                                        </div>
                                        <span class="title"
                                            ><span>{{
                                                goodsInfo.title
                                            }}</span></span
                                        >
                                        <span class="price" style="color: red"
                                            ><span
                                                >{{ goodsInfo.label }}：{{
                                                    goodsInfo.price[
                                                        goodsInfo.price.length -
                                                            1
                                                    ]
                                                }}</span
                                            ></span
                                        >
                                        <span class="href"
                                            ><a :href="goodsInfo.href"
                                                >立即前往</a
                                            ></span
                                        >
                                    </el-row>
                                </div>
                            </div>
                            <div class="chartbox">
                                <el-row justify="center">
                                    <div
                                        id="chart"
                                        :style="{
                                            borderRadius: `var(--el-border-radius-base)`,
                                            boxShadow: `var(--el-box-shadow-lighter)`,
                                        }"
                                    ></div>
                                    <show
                                        class="chartbox goodsevaluate"
                                        :option1="calOption"
                                        :id-name="['Chart1']"
                                    />
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
import navfrom from '../components/navfrom.vue';
import * as echarts from 'echarts';
import { useRoute } from 'vue-router';
import {
    getJdCalculationById,
    getJdGoodsById,
    getTmCalculationById,
    getTmGoodsById,
} from '../api/steward';
import { onMounted, ref } from 'vue';
import show from '../components/show.vue';
export default {
    components: { navfrom, show },
    setup() {
        const route = useRoute();
        const isJD = route.query.type === 'jd';
        const goodsInfo = ref();
        const calOption = ref({
            title: {
                text: '统计数据',
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: [],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [],
            },
            yAxis: {
                type: 'value',
            },
            series: [],
        });

        onMounted(async () => {
            const info = isJD
                ? await getJdGoodsById(route.query.id)
                : await getTmGoodsById(route.query.id);
            goodsInfo.value = info.goodsInfo;
            runChart(goodsInfo);
            const { data } = isJD
                ? await getJdCalculationById(route.query.id as string)
                : await getTmCalculationById(route.query.id as string);
            const legend = [];
            let xAxis = [];
            const series = Object.keys(data).map((el) => {
                const obj = {
                    name: el,
                    type: 'line',
                    data: data[el].data.map(parseFloat),
                };
                legend.push(el);
                xAxis = data[el].time;
                return obj;
            });
            calOption.value.legend.data = legend;
            calOption.value.xAxis.data = xAxis;
            calOption.value.series = series;
        });

        function runChart(data) {
            data.value.time.unshift(new Date(data.value.startTime).getTime());

            const option = {
                title: {
                    text: '商品价格变动',
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    data: data.value.time.map((el) =>
                        new Date(parseInt(el)).toDateString(),
                    ),
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: data.value.price,
                        type: 'line',
                        smooth: true,
                    },
                ],
            };
            const chartDom = document.getElementById('chart');
            const myChart = echarts.init(chartDom);
            myChart.setOption(option);
        }

        return { goodsInfo, calOption };
    },
};
</script>

<style scoped>
* {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    line-height: 1.8;
}
.box {
    height: 800px;
    width: 1800px;
    border: 1px;
}
.item {
    height: 750px;
    width: 500px;
    border: 2px;
    margin-top: 25px;
}
.chartbox {
    height: 750px;
    width: 1200px;
    margin-top: 25px;
}
.itemInfo .img {
    width: 400px;
    height: 300px;
    margin-top: 25px;
}
img {
    width: 100%;
    height: 100%;
}
.itemInfo .title {
    width: 400px;
    height: 100px;

    margin-top: 60px;
}
.itemInfo .price {
    width: 400px;
    height: 100px;
    margin-top: 60px;
}
.chartbox #chart {
    height: 350px;
    width: 1040px;
    margin-top: 25px;
}

.chartbox .goodsevaluate {
    height: 350px;
    width: 1040px;
    margin-top: 10px;
}
.comment-item {
    width: 1038px;
    font-size: 14px;
    line-height: 180%;
    color: rgb(0, 0, 0);
}
.comment-item .pic-list {
    width: 100%;
    margin-top: 28px;
}
.comment-item .pic-list .img {
    margin-bottom: 10px;
    margin-left: 10px;
    border: #fafcff;
}
.comment-item .pic-list .img img {
    height: 100%;
    width: 100%;
}
</style>
