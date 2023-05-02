import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading, ElNotification } from 'element-plus';
import { h } from 'vue';
import router from './router';
import { user } from './store/user';

let loading: any;

const startLoading = () => {
    interface Options {
        lock: boolean;
        text: string;
        background: string;
    }

    const options: Options = {
        lock: true,
        text: '加载中...',
        background: 'rgba(0,0,0,0.7)',
    };
    loading = ElLoading.service(options);
};

const endLoading = () => {
    loading.close();
};

// 创建一个数组用于存储已发送的请求
const pendingRequests = [];

// 定义一个函数用于生成请求的标识
const generateRequestKey = (config) => {
    return [config.method, config.url].join('&');
};

// 定义一个函数用于移除已完成的请求
const removePendingRequest = (config) => {
    const requestKey = generateRequestKey(config);
    const index = pendingRequests.indexOf(requestKey);
    if (index > -1) {
        pendingRequests.splice(index, 1);
    }
};

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    // 生成请求的标识
    const requestKey = generateRequestKey(config);
    // 判断是否有重复的请求
    if (pendingRequests.includes(requestKey)) {
        // 如果有，就取消掉
        config.cancelToken = new axios.CancelToken((cancel) => {
            cancel('重复的请求被取消了');
        });
    } else {
        // 如果没有，就把请求的标识添加到数组中
        const userstore = user();
        if (userstore.tokenInfo.access_token) {
            config.headers.Authorization = `Bearer ${userstore.tokenInfo.access_token}`;
        }
        startLoading();
        pendingRequests.push(requestKey);
    }
    return config;
});

// 响应拦截
axios.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        // 结束loading
        console.log(response);
        endLoading();
        removePendingRequest(response.config);
        if (response.data.status >= 200 && response.data.status < 300) {
            // 返回响应数据
            return response;
        } else {
            // 抛出一个错误
            ElNotification({
                title: '提示',
                message: h(
                    'i',
                    { style: 'color: teal' },
                    `${response.data.message}`,
                ),
            });
            throw new Error(`请求失败，状态码：${response.data.status}`);
        }
    },
    async (error) => {
        console.log(error);
        if (!axios.isCancel(error)) {
            // 移除已完成的请求
            removePendingRequest(error.config);
        }
        if (!error.response) {
            return Promise.reject(error);
        }
        console.log(error.response);
        if (error.response.status === 401) {
            const userstore = user();
            if (
                userstore.tokenInfo.refresh_token &&
                userstore.tokenInfo.refresh_token !== 'undefined'
            ) {
                userstore.tokenInfo.access_token = null;
                const res = await axios({
                    method: 'put',
                    url: '/api/authorizations/refreshToken',
                    headers: {
                        Authorization: `Bearer ${userstore.tokenInfo.refresh_token}`,
                    },
                });
                const { access_token, refresh_token } = res.data;
                userstore.setToken({ access_token, refresh_token });
                return await axios.request(error.config);
            } else {
                const userstore = user();
                userstore.removeToken();
                userstore.removeuserInfo();
                if (router.currentRoute.value.path !== '/') {
                    await router.push('/');
                    alert('请重新登陆');
                }
            }
        }
        // 结束loading
        endLoading();
        // 错误提醒
        Promise.reject(error);
    },
);

export default axios;
