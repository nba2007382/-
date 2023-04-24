<template>
    <section>
        <div class="container">
            <div class="header">
                <navfrom />
            </div>
            <div class="main">
                <show :option1="jdOption" :id-name="['Chart1']" />

                <beikePanel /> -->
                <!-- <show
                :option1="movieOption1"
                :option2="movieOption2"
                :list-data="movieList"
                :id-name="['Chart3', 'Chart4']"
            /> -->
                <jdPanel />
            </div>
            <div class="flooter"></div>
        </div>
    </section>
</template>

<script lang="ts">
import navfrom from '../components/navfrom.vue';
import show from '../components/show.vue';
import beikePanel from '../components/beikePanel.vue';
import jdPanel from '../components/jdPanel.vue';
import { getJdChart } from '../api/steward';
import { onMounted, ref } from 'vue';
export default {
    components: { navfrom, jdPanel, show },

    setup() {
        const jdOption = ref({
            title: {
                text: '京东商品',
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
                axisLabel: {
                    formatter: function (value) {
                        console.log(value);
                        return new Date(parseInt(value)).toDateString();
                    },
                },
            },
            yAxis: {
                type: 'value',
            },
            series: [],
        });
        onMounted(async () => {
            const { data } = await getJdChart();
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
                    const price = new Array(index).fill(el.data[0][0]);
                    el.data[0].unshift(...price);
                }
                const obj = {
                    name: el.name.trim().slice(0, 6),
                    type: 'line',
                    stack: 'Total',
                    data: el.data[0],
                };
                legend.push(el.name.trim().slice(0, 6));
                return obj;
            });
            jdOption.value.legend.data = legend;
            jdOption.value.series = series;
            jdOption.value.xAxis.data = MaxTimeArr;
        });
        return {
            jdOption,
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
