<template>
    <div class="page-login mt-5">
        <div class="card py-3" style="box-shadow: #b8b8b8 0px 1px 2px 1px;">
                <div class="col-md-12 p-5">
                    <h3 class="d-flex justify-content-center">ĐĂNG NHẬP</h3>
                    <LoginForm :user="user" @submit:login="login" />
                    <p class="msg-error">{{ message }}</p>
                    <div class="mt-1 text-center">
                        Bạn chưa có tài khoản? <router-link :to="{ name: 'contact.register' }">Đăng Ký</router-link>
                    </div>
                </div>
        </div>
    </div>
</template>
<script setup>
import UserService from "@/services/user.service";
import LoginForm from "@/components/LoginForm.vue";
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';
const authStore = useAuthStore();
let user = ref({});
let message = ref("");
const login = async (data) => {
    try {
        await UserService.login(data);
        await authStore.loginStore(data);
        router.push({ name: "contactbook" });
    } catch (error) {
        message.value = error?.response?.data?.message;
    }
}
</script>
<style>
.msg-error {
    color: red;
}
</style>