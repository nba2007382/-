<template>
    <div class="common-layout">
    <el-container>
      <el-header>
          <navfrom/>
          </el-header>
      <el-container>
        <el-main>
          <el-row>
            <div class="watchList" :style="{boxShadow: `var(--el-box-shadow-lighter)`}">
              <el-scrollbar>
                
                <div style="padding-left: 369px;" >
                   <a  @click="deletshow=!deletshow">
                  <div  class="delete" style="border-radius: 20px;" :style="{boxShadow: `var(--el-box-shadow-lighter)`}">                   
                      <svg style="width:30px;height:30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"></path></svg>                   
                  </div>
                  </a>
                </div> 
              <el-row>           
                <div  class="avator" v-for="(item,index) in watchList"  :style="{boxShadow: `var(--el-box-shadow-lighter)`}" :index="index"  :key="item.user.id" :id="item.user.id">            
                  <a  @click="setAvatorIndex($event)">
                     <el-row align="middle">
                    <img :src="item.user.profile_image_url" :alt="item.user.screen_name">
                    <p class="name">{{item.user.screen_name}}</p>
                    <el-button v-if='deletshow' @click="deleteAvator($event)" class="delete" type="danger" :icon="CloseBold" circle />
                     </el-row>
                  </a>   
                </div>
                <div class="addAvator">
                  <el-popover :visible="visible" placement="right" :width="560">
                    <p>请添加你想要监控的微博用户主页链接</p>
                    <el-input v-model="input" placeholder="Please input" clearable />
                    <div style="text-align: right; margin: 0">
                      <el-button size="small" type="text" @click="visible = false"
                        >取消</el-button>
                      <el-button size="small" type="primary" @click="visible = false ,handleHref()"
                        >提交</el-button>
                    </div>
                    <template #reference>
                        <div class="add"  @click="visible = true">
                          <a >
                            <div style="width:50px;height:50px;border-radius:50%">
                              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"></path></svg>
                            </div>         
                          </a>     
                      </div>
                    </template>
                  </el-popover>                              
                </div>
                </el-row>
                </el-scrollbar>
            </div>
            <div class="content" :style="{boxShadow: `var(--el-box-shadow-lighter)`}" >
              <el-scrollbar ref="scrollbarRef" max-height="100vh" @scroll="loadPic">
              <div v-if="watchList.length!==0" >
                <div v-for="item in watchList[avatorIndex].content" :key="item.id">
                  <div v-if="item.isTop" class="wbpro-scroller-item" style="margin-top:5px" :key="item.id" :id="item.id" :style="{boxShadow: `var(--el-box-shadow-lighter)`}">
                    <p v-if="item.isTop" style="margin-top:5px;margin-left:5px;margin-bottom:5px;color:red">置顶</p>
                    <div class="header" :key="item.id">
                      <el-row>
                        <img :src="watchList[avatorIndex].user.profile_image_url" :alt="watchList[avatorIndex].user.screen_name">
                        <div style="margin-top:10px;margin-left:10px">
                            <p >{{watchList[avatorIndex].user.screen_name}}</p>
                            <p style="font-size:15px;margin-top:5px;;margin-left:5px;color:#a0a0a0" v-html="time=conentTime(item.created_at)"></p>
                        </div>
                      </el-row>    
                    </div>
                    <div class="wbpro-feed-content" :key="item.id">
                      <div class="text" v-html="item.text">     
                      </div>
                      <div class="pic-list" :key="item.id">
                        <el-row>
                        <div class="pic" v-for="(p,k) in item.pic_infos" :key="p.pic_id" @click="getPicList(k,item.pic_infos)">                          
                            <video v-if="p.type=='livephoto'" :data-id="item.id" class="img_video" width="132" height="132" style="border-radius: 10px;" :poster="p.original.url" :data-src="p.video" type="video/mp4" autoplay loop muted></video>
                            <img v-else :data-id="item.id" :data-src="p.original.url"  style="width: 132px; height:132px;border-radius: 10px;" >                                             
                        </div>
                        </el-row>            
                      </div>
                    </div>
                  </div>
                </div>
                <div  v-for="item in watchList[avatorIndex].content" :key="item.id" >
                  <div v-if="item.isTop===undefined" class="wbpro-scroller-item" style="margin-top:5px"  :key="item.id" :id="item.id" :style="{boxShadow: `var(--el-box-shadow-lighter)`}">
                    <div class="header" :key="item.id">
                      <el-row>
                        <img :src="watchList[avatorIndex].user.profile_image_url" :alt="watchList[avatorIndex].user.screen_name">
                        <div style="margin-top:10px;margin-left:10px">
                            <p >{{watchList[avatorIndex].user.screen_name}}</p>
                            <p style="font-size:15px;margin-top:5px;;margin-left:5px;color:#a0a0a0" v-html="time=conentTime(item.created_at)"></p>
                        </div>
                      </el-row>    
                    </div>
                    <div class="wbpro-feed-content" :key="item.id">
                      <div class="text" v-html="item.text">     
                      </div>
                      <div class="pic-list" :key="item.id">
                        <el-row>
                          <div class="pic" v-for="(p,k) in item.pic_infos" :key="p.pic_id" @click="getPicList(k,item.pic_infos)">                          
                            <video v-if="p.type=='livephoto'" :data-id="item.id" class="img_video" width="132" height="132" style="border-radius: 10px;" :poster="p.original.url" :data-src="p.video" type="video/mp4" autoplay loop muted></video>
                            <img v-else :data-id="item.id" :data-src="p.original.url"  style="width: 132px; height:132px;border-radius: 10px;" >                                             
                        </div>
                        </el-row>            
                      </div>
                    </div>
                  </div>                
                </div>
              </div> 
              </el-scrollbar>   
            </div>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
    <div v-show="previewList" class="preview" style="position:absolute;top:0;left:0;right:0;bottom:0;">
        <div @click="()=>{previewList=false,previewIndex=null}" style="position:absolute;top:0;left:0;right:0;bottom:0;background-color:#242529;opacity: 0.25">
        </div>
        <div v-if="previewIndex!==null" style="height:100%;width:70%;z-index:100;margin-left:50%;transform:translateX(-50%);background-color:#242529;">
           <el-carousel height="100vh" :initial-index="previewIndex" :autoplay="false">
              <el-carousel-item v-for="(p,i) in previewList" :key="i" style="overflow-y: auto;">
              <el-row justify="center" align="middle" style="width:100%;height: 100%;">
                 <video v-if="p.type=='livephoto'" :src="p.video" :poster="p.original.url" autoplay loop controls muted></video>
                <img v-else  :src="p.largest.url" >
              </el-row>                                                                         
              </el-carousel-item>
            </el-carousel>
        </div>       
    </div>
  </div>

</template>

<script lang="ts">
import axios from 'axios'
import navfrom from'../components/navfrom.vue'
import { CloseBold} from '@element-plus/icons-vue'
import {ref} from'vue'
import { ElScrollbar } from 'element-plus'
export default {
    components:{navfrom},
    setup(){
  
      const watchList=ref([])
      const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
      const getList=()=>{
        axios.get('/api/monito/wb/getWatchList').then(res=>{
          watchList.value=res.data.list
          for (let i = 0; i < watchList.value.length; i++) {
            const el = watchList.value[i];
            el.content.sort((a,b)=>{
              // @ts-ignore
              return  new Date(b.created_at)-new Date(a.created_at)
            })          
          }
        
        scrollbarRef.value.$emit('scroll',{scrollTop:0,scrollLeft:0})
        })
      }
      const avatorIndex=ref(0)
      const setAvatorIndex=(event)=>{  
        const el=event.currentTarget.parentElement
        const index= el.getAttribute("index")
        avatorIndex.value=index
         scrollbarRef.value.$emit('scroll',{scrollTop:0,scrollLeft:0})
      }
      const visible = ref(false)
      const deletshow = ref(false)
      const input = ref('') 
      const handleHref=()=>{
        axios.get('/api/monito/wb/addWatchList',{
          params:{
            url:input
          }
        }).then(res=>{
          alert(res.data.msg)
          getList()
        })
      }
      const deleteAvator=(event)=>{
        const el= event.currentTarget.parentElement.parentElement.parentElement
        const id= el.getAttribute("id")
        axios.delete("/api/monito/wb/delWatchList",{
          params:{id:id}
        }).then((res)=>{
          alert(res.data.msg)
          getList()
        })
      }
      const conentTime=(date)=>{
          const time=new Date(date)
          const month= time.getMonth()+1
          const day=time.getDate()
          const year=time.getFullYear()
          const hour=time.getHours()
          const min=time.getMinutes()
          const now=new Date()
          const nowYear= now.getFullYear()
          if (nowYear>year) {
            const conentTime=year+'-'+month+'-'+day+' &nbsp;&nbsp;&nbsp'+hour+':'+min
            return conentTime
          }else{
            const conentTime=month+'-'+day+'&nbsp;&nbsp;&nbsp'+hour+':'+min
            return conentTime
          }
      }
       // @ts-ignore
      

     
      
       const loadPic = function({scrollTop}) {
        // @ts-ignore
        
        let load:number=setTimeout(()=>{
          let videos = document.querySelectorAll('.img_video')
          let imgs=document.querySelectorAll('.pic-list .pic img')          
          let getTop = function(e) {
            let id=e.getAttribute('data-id')
            let el=document.getElementById(id)
            return el.parentElement.offsetTop
          }         
          let lazyLoad = function(videoList,imgsList) {
            let contentbox=document.querySelector('.content')
            // @ts-ignore
            let height = contentbox.offsetHeight
            let scollHeight = scrollTop
            for (let i = 0; i < videoList.length; i++) {
              if (height + scollHeight > getTop(videoList[i])) {
                let path = videoList[i].getAttribute('data-src')
                if (path!=='') {
                  videoList[i].src = path
                  videoList[i].setAttribute('data-src','')
                }
              }
            }
            for (let i = 0; i < imgsList.length; i++) {
              if (height + scollHeight > getTop(imgsList[i])) {
                let path = imgsList[i].getAttribute('data-src')
                if (path!=='') {
                  imgsList[i].src = path
                  imgsList[i].setAttribute('data-src','')
                }
              }
            }          
          }
         lazyLoad(videos,imgs)

        },200)
          
      }
      let previewIndex=ref(null)
      let previewList=ref()
      const getPicList=(key,list)=>{
        previewList.value=list
        let index=0
        for (const prop in list) {
          if (prop==key) {
            previewIndex.value=index
            return
          }
          index++
        }        
      }
      getList()
      return{watchList,input,deletshow,visible,handleHref,setAvatorIndex,avatorIndex,CloseBold,deleteAvator,conentTime,loadPic,getPicList,previewIndex,previewList,scrollbarRef}
    }
}
</script>

<style scoped>
.watchList{
    height: 88vh;
    width: 400px;
}
.content{
  height: 88vh;
  flex: 1;
}
.avator{
  border-radius: 4px;
  transition: all 0.5s ;
}
.avator:hover{
  transform: translateY(-10px);
}
.watchList img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.watchList .avator{
  margin-left: 5px;
  margin-bottom: 5px;
}
.wbpro-scroller-item{
  padding: 4px;
}
.wbpro-scroller-item .header{
  margin-bottom: 10px;
}
.wbpro-scroller-item .header img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.pic{
  border-radius: 10px;
  margin-left: 5px;
  background-color: #eeeeee;
}
.pic-list{
  margin-top: 10px;
}
.pic-list .pic img{
  transition: all 0.5s ; 
}
.pic-list .pic img:hover{
  transform: translateY(5px);
}
.img-video{

  height: 132px;
  width: 132px;

}

</style>