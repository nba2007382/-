import { defineStore } from 'pinia';
interface UserInfo {
    name: string | null;
    email: string | null;
}
interface TokenInfo {
    access_token: string | null;
    refresh_token: string | null;
}

const user = defineStore('userlogin', {
    state: () => {
        return {
            userInfo: <UserInfo>{
                name: localStorage.getItem('name'),
                email: localStorage.getItem('email'),
            },
            tokenInfo: <TokenInfo>{
                access_token: localStorage.getItem('access_token'),
                refresh_token: localStorage.getItem('refresh_token'),
            },
        };
    },
    getters: {},
    actions: {
        setuserInfo(userInfo: UserInfo) {
            this.userInfo.name = userInfo.name;
            this.userInfo.email = userInfo.email;
            localStorage.name = userInfo.name;
            localStorage.email = userInfo.email;
        },

        setToken(tokenInfo: TokenInfo) {
            this.tokenInfo.access_token = tokenInfo.access_token;
            this.tokenInfo.refresh_token = tokenInfo.refresh_token;
            localStorage.access_token = tokenInfo.access_token;
            localStorage.refresh_token = tokenInfo.refresh_token;
        },
        removeToken() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            this.tokenInfo = <TokenInfo>{
                access_token: null,
                refresh_token: null,
            };
        },
        removeuserInfo() {
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            this.userInfo.name = null;
            this.userInfo.email = null;
        },
    },
});
export { user };
