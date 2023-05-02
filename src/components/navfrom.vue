<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav>
        <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">
                <router-link to="/">首页</router-link></el-menu-item
            >
            <el-menu-item index="2"
                ><router-link to="/JD">京东</router-link></el-menu-item
            >
            <el-menu-item index="3"
                ><router-link to="/TM">天猫</router-link></el-menu-item
            >
            <el-menu-item
                v-if="!userEmail"
                index="4"
                style="
                    right: 50px;
                    position: absolute;
                    border-radius: 15px;
                    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
                "
                @click="display()"
                >登陆</el-menu-item
            >

            <el-sub-menu
                v-if="userEmail"
                index="5"
                style="
                    right: 50px;
                    position: absolute;
                    border-radius: 15px;
                    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
                "
            >
                <template #title> {{ userName }}</template>
                <el-menu-item index="5-1">{{ userEmail }}</el-menu-item>
                <el-menu-item
                    index="5-2"
                    @click="
                        loginOut();
                        router.push('/');
                    "
                    >退出登陆</el-menu-item
                >
            </el-sub-menu>
        </el-menu>
        <loginfrom
            v-if="num"
            style="
                margin-top: 20%;
                margin-left: 50%;
                transform: translate(-50%, -50%);
            "
        />
    </nav>
</template>

<script lang="ts">
import loginfrom from './loginfrom.vue';
import { computed, ref } from 'vue';
import router from '../router';
import { user } from '../store/user';
import axios from '../https';
export default {
    components: { loginfrom },
    setup() {
        const userstore = user();

        const userName = computed(() => userstore.userInfo.name);
        const userEmail = computed(() => userstore.userInfo.email);
        const num = ref(false);
        const display = () => {
            num.value = !num.value;
        };
        const loginOut = () => {
            userstore.removeToken();
            userstore.removeuserInfo();
        };
        axios.get('/api/check/login');
        return { num, display, loginOut, userName, userEmail, router };
    },
};
</script>

<style scoped></style>
