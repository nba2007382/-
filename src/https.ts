import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';
import router from './router';
import {user} from './store/user'


let loading: any;

const startLoading = () => {
  
  interface Options {
    lock: boolean;
    text: string;
    background: string;
  };

  const options: Options = {
    lock: true,
    text: "加载中...",
    background: 'rgba(0,0,0,0.7)'
  }
  loading = ElLoading.service(options);
}

const endLoading = () => {
  loading.close();
}

// 请求拦截
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  // 加载
  const userstore=user()
  if (userstore.tokenInfo.access_token) {
    config.headers.Authorization=`Bearer ${userstore.tokenInfo.access_token}`
  }
  startLoading();
  return config;
})


// 响应拦截
axios.interceptors.response.use((response: AxiosResponse<any>) => {
  // 结束loading
  endLoading();
  return response;

  },
   async error => {
    if (!error.response) {
      return Promise.reject(error)
    }    
    if (error.response.status === 401) {
      try { 
         const userstore=user()
        if(userstore.tokenInfo.refresh_token){        
            userstore.tokenInfo.access_token=null
                const res = await axios({
                  method: 'put',
                  url: '/api/authorizations/refreshToken',
                  headers: {
                    Authorization: `Bearer ${userstore.tokenInfo.refresh_token}`
                  }
                });    
          const { access_token,refresh_token } = res.data;
          userstore.setToken({ access_token ,refresh_token});                      
          return await axios.request(error.config)
      
  }else{ 
      throw new Error('无刷新TOKEN')
    }
  } catch (err) {
    const userstore=user()
    userstore.removeToken()
    userstore.removeuserInfo()
    if (router.currentRoute.value.path!=='/') {          
      await router.push('/')  
      alert('请重新登陆') 
    }   
     Promise.reject(error) 
}
}
    // 结束loading
    endLoading();
    // 错误提醒
     Promise.reject(error);
  })

export default axios;