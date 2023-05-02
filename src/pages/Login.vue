<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="loginContainer">
        <navfrom style="position: absolute; width: 100%; z-index: 1" />
        <div class="shell" style="z-index: 0">
            <div id="a" class="image"></div>
            <div class="heading">
                <h1>这里是您的监控管家</h1>
            </div>
            <div class="text">
                <h1>您可以通过管家查看珠海房价变换</h1>
            </div>
            <div id="b" class="image"></div>
            <div class="heading">
                <h1>欢迎您的到来</h1>
            </div>
            <div class="text">
                <h1>您可以通过管家查看豆瓣电影评分变换</h1>
            </div>

            <div id="c" class="image"></div>
            <div class="heading">
                <h1>您可以监控微博用户</h1>
            </div>
            <div class="text">
                <h1>您还能监控京东商品，并查看它的价格变换</h1>
            </div>

            <div id="d" class="image"></div>
            <div class="heading">
                <h1>谢谢您的使用</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import navfrom from '../components/navfrom.vue';
export default {
    components: { navfrom },
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}
.shell {
    height: 100vh;
    overflow-x: hidden;
    perspective: 3px;
}
.shell div {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: 30px;
    letter-spacing: 2px;
}
.image {
    transform: translateZ(-1px) scale(1.6);
    background-size: cover;
    height: 100vh;
    z-index: -1;
}
.text {
    height: 50vh;
    background-color: #fff;
}
.text h1 {
    color: #000;
}
.heading {
    z-index: -1;
    transform: translateY(-30vh) translateZ(1px);
    color: #fff;
    font-size: 30px;
}
#a {
    background-image: url('/src/assets/loginpic/1.jpg');
}
#b {
    background-image: url('/src/assets/loginpic/2.jpg');
}
#c {
    background-image: url('/src/assets/loginpic/3.jpg');
}
#d {
    background-image: url('/src/assets/loginpic/4.jpg');
}
</style>
