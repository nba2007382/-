<template>
<div class="container">
 <div class="header">
      <navfrom/>
  </div>
  <div class="main">
    <show  :option1='houseOption1' :option2='houseOption2' :listData="houseList"  :idName="['Chart1','Chart2']"/>
    
    <beikePanel/>
    <show  :option1='movieOption1' :option2='movieOption2' :listData="movieList"  :idName="['Chart3','Chart4']"/>
    <jdPanel/>
  </div>
  <div class="flooter"></div>
</div>
 
</template>

<script lang='ts'>
import navfrom from'../components/navfrom.vue'
import show from '../components/show.vue'
import beikePanel from'../components/beikePanel.vue'
import jdPanel from'../components/jdPanel.vue'
import {houseList,houseOption1,houseOption2} from '../utils/house/house' 
import {movieList, movieOption2, movieOption1} from '../utils/movie/movie' 
export default {
    components:{navfrom,show,beikePanel,jdPanel},

    setup(){ 
        // @ts-ignore




   return {houseList,movieList,houseOption1,houseOption2,movieOption1,movieOption2}
    }
}
</script>

<style scoped>
* {
    /* 初始化 */
    margin: 0;
    padding: 0;
}
.container{
    display: flex;
    flex-direction:column;
    align-items: center;

}
.header{
    height: 805px;
    width: 100%;
    background-image: url('/src/assets/background/veer-305178880.jpg');
    background-size:100% 100%
}
.nav-banner{
    height: 34px;
    width: 100%;
    background-color: #000000;
    margin-bottom: 30px;
}

</style>