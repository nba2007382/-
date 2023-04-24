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

// 请求拦截
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    // 加载
    const userstore = user();
    if (userstore.tokenInfo.access_token) {
        config.headers.Authorization = `Bearer ${userstore.tokenInfo.access_token}`;
    }
    startLoading();
    return config;
});

// 响应拦截
axios.interceptors.response.use(
    (response: AxiosResponse<any>) => {
        // 结束loading
        console.log(response);
        endLoading();
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
        if (!error.response) {
            return Promise.reject(error);
        }
        console.log(error.response);
        if (error.response.status === 401) {
            try {
                const userstore = user();
                if (userstore.tokenInfo.refresh_token) {
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
                    throw new Error('无刷新TOKEN');
                }
            } catch (err) {
                const userstore = user();
                userstore.removeToken();
                userstore.removeuserInfo();
                if (router.currentRoute.value.path !== '/') {
                    await router.push('/');
                    alert('请重新登陆');
                }
                Promise.reject(error);
            }
        }
        // 结束loading
        endLoading();
        // 错误提醒
        Promise.reject(error);
    },
);

export default axios;
