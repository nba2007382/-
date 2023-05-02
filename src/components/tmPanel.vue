<template>
    <section class="section">
        <div class="box">
            <h5 style="position: absolute">天猫商品监控</h5>
            <el-button
                class="delete"
                type="danger"
                :icon="Delete"
                circle
                @click="deletshow = !deletshow"
            />
            <div>
                <ul v-if="list" style="display: flex">
                    <li
                        v-for="item in list.data"
                        :key="item.id"
                        class="list move"
                        :Tm_id="item.id"
                    >
                        <el-button
                            v-if="deletshow"
                            class="delete"
                            type="danger"
                            :icon="CloseBold"
                            circle
                            @click="deletegoods($event)"
                        />
                        <router-link
                            :to="{
                                path: '/detail',
                                query: { type: 'tm', id: item.id },
                            }"
                        >
                            <div class="pic">
                                <img
                                    :src="formatterImg(item.img)"
                                    :alt="item.title"
                                />
                            </div>
                            <p style="overflow: hidden; max-height: 30px">
                                {{ item.title }}
                            </p>
                        </router-link>

                        <label style="font-weight: bolder; color: red">{{
                            item.label
                        }}</label>
                        <span>{{ item.price[item.price.length - 1] }} 元</span>
                    </li>
                </ul>
            </div>
            <el-popover :visible="visible" placement="right" :width="560">
                <p>请添加你想要监控的天猫商品链接</p>
                <el-input
                    v-model="input"
                    placeholder="Please input"
                    clearable
                />
                <div style="text-align: right; margin: 0">
                    <el-button size="small" type="text" @click="visible = false"
                        >取消</el-button
                    >
                    <el-button
                        size="small"
                        type="primary"
                        @click="(visible = false), handleHref()"
                        >提交</el-button
                    >
                </div>
                <template #reference>
                    <div class="add" @click="visible = true">
                        <a href="javascript:;">
                            <img src="../assets/add.webp" alt="" />
                        </a>
                    </div>
                </template>
            </el-popover>
        </div>
    </section>
</template>

<script lang="ts">
import { ref } from 'vue';
import { Delete, CloseBold } from '@element-plus/icons-vue';
import { addTmGoods, delTmGoods, getTmGoods } from '../api/steward';
export default {
    setup() {
        const visible = ref(false);
        const deletshow = ref(false);
        const input = ref('');

        const handleHref = () => {
            addTmGoods(input.value).then((res) => {
                alert(res.message);
                getList();
            });
        };
        let list = ref() as any;
        const getList = async () => {
            const data = await getTmGoods();
            list.value = data;
        };
        getList();
        const deletegoods = async (event) => {
            const el = event.currentTarget.parentElement;
            const id = el.getAttribute('Tm_id');
            delTmGoods(id).then((res) => {
                alert(res.message);
                getList();
            });
        };

        const formatterImg = (str: string) => {
            let imgUrl = str.replace('.avif', '.jpg');
            return imgUrl;
        };

        return {
            visible,
            input,
            handleHref,
            list,
            Delete,
            CloseBold,
            deletshow,
            deletegoods,
            formatterImg,
        };
    },
};
</script>

<style scoped>
.move {
    transition: all 0.5s;
}
.move:hover {
    transform: translateY(-5px);
}

.box {
    width: 950px;
    position: relative;
    display: flex;
    margin: 0 auto;
    margin-bottom: 50px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}
.delete {
    position: absolute;
    right: 1px;
}
.list {
    height: 200px;
    width: 150px;
    margin: 20px;
    position: relative;
    display: inline-block;
    font-size: 12px;
    border-radius: 10px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}
a {
    text-decoration: none;
    color: black;
}
.add {
    height: 200px;
    width: 150px;
    margin: 20px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.25);
}
img {
    height: 150px;
    width: 150px;
}
</style>
