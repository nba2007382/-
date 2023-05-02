<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="section">
        <div :id="idName[0]" class="chart move"></div>
    </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { onMounted, getCurrentInstance, nextTick } from '@vue/runtime-core';
export default {
    props: {
        idName: Array,
        option1: { type: Object },
    },
    setup(props) {
        onMounted(() => {
            nextTick(() => {
                let waitChart = setInterval(() => {
                    if (props.option1) {
                        console.log(props.option1);

                        let myChart = echarts.init(
                            document.getElementById(props.idName[0] as any),
                        );
                        myChart.setOption(props.option1);
                        clearInterval(waitChart);
                    }
                }, 500);
            });
        });
        return {};
    },
};
</script>

<style scoped>
.chart {
    flex: 1;
    width: 100%;
    height: 100%;
}
.section {
    width: 100%;
    height: 500px;
    padding: 10px;
    min-height: 100px;
    margin-bottom: 30px;
}
.section:nth-of-type(even) {
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
    flex-wrap: wrap;
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
.move {
    transition: all 0.5s;
}
.move:hover {
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
img {
    height: 100%;
    width: 100%;
}
a {
    text-decoration: none;
    color: black;
}
ul,
ol {
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
