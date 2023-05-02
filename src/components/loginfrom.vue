<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="container">
        <div class="welcome">
            <div class="pinkbox" :class="{ 'pinkbox-move': !nodisplay }">
                <!-- 注册 -->
                <div class="signup" :class="{ nodisplay: nodisplay }">
                    <h1>注册</h1>
                    <Form
                        ref="register"
                        v-slot="{ errors }"
                        autocomplete="off"
                        :model="registerUser"
                        :validation-schema="registerRules"
                    >
                        <Field
                            v-model="registerUser.user_name"
                            name="name"
                            type="text"
                            placeholder="用户名"
                        />
                        <div v-if="errors.name">
                            <span class="errors">用户名{{ errors.name }}</span>
                        </div>
                        <Field
                            v-model="registerUser.user_email"
                            name="email"
                            type="email"
                            placeholder="邮箱"
                        />
                        <div v-if="errors.email">
                            <span class="errors">邮箱{{ errors.email }}</span>
                        </div>
                        <Field
                            v-model="registerUser.user_password"
                            name="password"
                            type="password"
                            placeholder="密码"
                        />
                        <div v-if="errors.password">
                            <span class="errors">密码长度必须为6-14</span>
                        </div>
                        <Field
                            v-model="registerUser.user_password2"
                            name="password2"
                            type="password"
                            placeholder="确认密码"
                        />
                        <div v-if="errors.password2">
                            <span class="errors">两次输入密码不一致</span>
                        </div>
                        <button
                            type="button"
                            class="button submit"
                            @click="handleregister"
                        >
                            创建账号
                        </button>
                    </Form>
                </div>
                <!-- 登录 -->
                <div class="signin" :class="{ nodisplay: !nodisplay }">
                    <h1>登陆</h1>
                    <Form
                        ref="login"
                        v-slot="{ errors }"
                        class="more-padding"
                        autocomplete="off"
                        :model="loginUser"
                        :validation-schema="loginRules"
                    >
                        <Field
                            v-model="loginUser.user_email"
                            name="email"
                            type="email"
                            placeholder="邮箱"
                        />
                        <div v-if="errors.email">
                            <span class="errors">邮箱{{ errors.email }}</span>
                        </div>
                        <Field
                            v-model="loginUser.user_password"
                            name="password"
                            type="password"
                            placeholder="密码"
                        />
                        <div v-if="errors.password">
                            <span class="errors">密码不能为空</span>
                        </div>
                        <div class="checkbox">
                            <input
                                id="remember"
                                v-model="loginUser.user_remember"
                                type="checkbox"
                            />
                            <label for="remember">记住 我</label>
                        </div>
                        <button
                            type="button"
                            class="buttom sumbit"
                            @click="handlelogin"
                        >
                            登陆
                        </button>
                    </Form>
                </div>
            </div>
            <div class="leftbox">
                <h2 class="title"><span>BLOOM</span>&<br />BOUQUET</h2>
                <p class="desc">Pick your perfect <span>bouquet</span></p>
                <img
                    class="flower smaller"
                    src="https://hbimg.huabanimg.com/c09305167a883e60179a45374df73252304001359acca-W3qbYm_fw658/format/webp"
                />
                <p class="account">已有账号?</p>
                <button class="button" @click="display()">登陆</button>
            </div>
            <div class="rightbox">
                <h2 class="title"><span>BLOOM</span>&<br />BOUQUET</h2>
                <p class="desc">Pick your perfect <span>bouquet</span></p>
                <img
                    class="flower"
                    src="https://hbimg.huabanimg.com/b28be92c8198975a74ad656eba00b352c9b9e589819af-lDXUAS_fw658/format/webp"
                />
                <p class="account">还没注册?</p>
                <button class="button" @click="display()">注册</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { Form, Field } from 'vee-validate';
import {
    loginRules,
    loginUser,
    registerRules,
    registerUser,
} from '../utils/loginFormValidate';
import router from '../router';
import axios from '../https';
import { user } from '../store/user';
export default {
    components: {
        Form,
        Field,
    },
    setup() {
        const nodisplay = ref(true);
        function display() {
            nodisplay.value = !nodisplay.value;
        }

        const register = ref(null);
        const login = ref(null);

        const handlelogin = async () => {
            const { valid } = await login.value.validate();
            if (valid == true) {
                axios.post('/api/user/login', loginUser).then((res) => {
                    const userstore = user();
                    const { access_token, refresh_token, userInfo } = res.data;
                    userstore.setToken({ access_token, refresh_token });
                    userstore.setuserInfo(userInfo);
                    const msg = res.data.message;
                    alert(msg);
                    router.go(0);
                    return;
                });
            } else {
                alert('提交错误，请从新提交');
                return;
            }
        };
        const handleregister = async () => {
            const { valid } = await register.value.validate();
            if (valid == true) {
                axios.post('/api/user/register', registerUser).then((res) => {
                    const msg = res.data.message;
                    alert(msg);
                    return;
                });
            } else {
                alert('提交错误，请从新提交');
                return;
            }
        };

        return {
            display,
            nodisplay,
            registerUser,
            loginUser,
            registerRules,
            loginRules,
            handleregister,
            handlelogin,
            register,
            login,
        };
    },
};
</script>

<style scoped>
/* 容器的样式 */
.container {
    width: 650px;
    height: 550px;
    position: relative;
}

.welcome {
    background: #f6f6f6;
    width: 650px;
    height: 415px;
    position: absolute;
    top: 25%;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.pinkbox {
    position: absolute;
    top: -10%;
    left: 5%;
    background: #eac7cc;
    width: 320px;
    height: 500px;
    border-radius: 5px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease-in-out;
    z-index: 2;
}
.pinkbox-move {
    transform: translateX(80%);
}
.nodisplay {
    display: none;
    transition: all 0.5s ease;
}

.leftbox,
.rightbox {
    position: absolute;
    width: 50%;
    transition: 1s all ease;
}

.leftbox {
    left: -2%;
}

.rightbox {
    right: -2%;
}

/* 字体和按钮的样式 */
h1 {
    font-family: 'Open Sans', sans-serif;
    text-align: center;
    margin-top: 95px;
    text-transform: uppercase;
    color: #f6f6f6;
    font-size: 2em;
    letter-spacing: 8px;
}

.title {
    font-family: 'Lora', serif;
    color: #8e9aaf;
    font-size: 1.8em;
    line-height: 1.1em;
    letter-spacing: 3px;
    text-align: center;
    font-weight: 300;
    margin-top: 20%;
}

.desc {
    margin-top: -8px;
}

.account {
    margin-top: 45%;
    font-size: 10px;
}

p {
    font-family: 'Open Sans', sans-serif;
    font-size: 0.7em;
    letter-spacing: 2px;
    color: #8e9aaf;
    text-align: center;
}

span {
    color: #eac7cc;
}

.flower {
    position: absolute;
    width: 150px;
    height: 150px;
    top: 45%;
    left: 27%;
    opacity: 0.8;
}

.smaller {
    width: 130px;
    height: 130px;
    top: 48%;
    left: 30%;
    opacity: 0.9;
}

button {
    padding: 12px;
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 11px;
    border-radius: 10px;
    margin: auto;
    outline: none;
    display: block;
}

button:hover {
    background: #eac7cc;
    color: #f6f6f6;
    transition: background-color 1s ease-out;
}

.button {
    margin-top: 3%;
    background: #f6f6f6;
    color: #ce7d88;
    border: solid 1px #eac7cc;
}

/* 表单样式 */
form {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 7px;
}

.more-padding {
    padding-top: 35px;
}

.more-padding Field {
    padding: 12px;
}

.more-padding .sumbit {
    margin-top: 45px;
}

.sumbit {
    margin-top: 25px;
    padding: 12px;
    border-color: #ce7d88;
}

.sumbit:hover {
    background: #cbc0d3;
    border-color: #bfb1c9;
}

.errors {
    color: rgb(224, 104, 104);
    font-weight: 100;
    font-size: 15px;
}
input {
    background: #eac7cc;
    width: 226px;
    color: #ce7d88;
    border: none;
    border-bottom: 1px solid rgba(246, 246, 246, 0.5);
    padding: 9px;
    font-weight: 100;
}

input::placeholder {
    color: #3b2929;
    letter-spacing: 2px;
    font-size: 1em;
    font-weight: 100;
}

input:focus {
    color: #ce7d88;
    outline: none;
    border-bottom: 1.2px solid rgba(206, 125, 136, 0.7);
    font-size: 1em;
    transition: 0.8s all ease;
}

input:focus::placeholder {
    opacity: 0;
}

label {
    font-family: 'Open Sans', sans-serif;
    color: #ce7d88;
    font-size: 0.8em;
    letter-spacing: 1px;
}

.checkbox {
    display: inline;
    white-space: nowrap;
    position: relative;
    left: -52px;
    top: 25px;
}

input[type='checkbox'] {
    width: 15px;
    background: #ce7d88;
}

.checkbox input[type='checkbox']:checked + label {
    color: #ce7d88;
    transition: 0.5s all ease;
}
</style>
