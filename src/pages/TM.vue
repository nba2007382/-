<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <section>
        <div class="container">
            <div class="header">
                <navfrom />
            </div>
            <div class="main">
                <show :option1="TmOption" :id-name="['Chart1']" />
                <TmPanel />
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="name" label="商品名称" width="180" />
                    <el-table-column prop="id" label="商品编号" />
                    <el-table-column prop="price" label="商品现价" />
                    <el-table-column prop="max" label="历史最高价格" />
                    <el-table-column prop="min" label="历史最低价格" />
                    <el-table-column prop="avg" label="平均价格" />
                    <el-table-column prop="std" label="方差" />
                </el-table>
            </div>
            <div class="flooter"></div>
        </div>
    </section>
</template>

<script lang="ts">
import navfrom from '../components/navfrom.vue';
import show from '../components/show.vue';
import TmPanel from '../components/tmPanel.vue';
import { getAllTmCalculation, getTmChart } from '../api/steward';
import { onMounted, ref } from 'vue';
export default {
    components: { navfrom, TmPanel, show },

    setup() {
        const TmOption = ref({
            title: {
                text: '天猫商品',
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
        const tableData = ref();

        onMounted(async () => {
            const { data } = await getTmChart();
            const legend = [];
            let MaxLength = 0;
            let MaxTimeArr = [];
            data.map((el, index) => {
                if (MaxLength < el.time[0].length) {
                    MaxLength = el.time[0].length;
                    MaxTimeArr = el.time[0];
                }
            });
            const series = data.map((el) => {
                if (el.time[0].length < MaxLength) {
                    const index = el.time[0]?.[0]
                        ? MaxTimeArr.findIndex((item) => item === el.time[0][0])
                        : MaxLength;
                    const price = new Array(index + 2).fill(el.data[0][0]);
                    el.data[0].unshift(...price);
                } else {
                    el.data[0].shift();
                }
                const obj = {
                    name: el.name.trim().slice(0, 6),
                    type: 'line',
                    data: el.data[0].map(parseFloat),
                };
                legend.push(el.name.trim().slice(0, 6));
                return obj;
            });
            TmOption.value.legend.data = legend;
            TmOption.value.series = series;
            TmOption.value.xAxis.data = MaxTimeArr.map((el) =>
                new Date(parseInt(el)).toDateString(),
            );
            const { data: caData } = await getAllTmCalculation();
            tableData.value = Object.keys(caData).map((el) => caData[el]);
        });
        return {
            TmOption,
            tableData,
        };
    },
};
</script>

<style scoped>
* {
    /* 初始化 */
    margin: 0;
    padding: 0;
}
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.header {
    height: 805px;
    width: 100%;
    background-image: url('/src/assets/background/veer-305178880.jpg');
    background-size: 100% 100%;
}
.nav-banner {
    height: 34px;
    width: 100%;
    background-color: #000000;
    margin-bottom: 30px;
}
</style>
