<template>
    <div class="page p-4">
        <div class="card px-5 py-3" style="box-shadow: #b8b8b8 0px 1px 3px 1px;">
            <div class="m-3">
                <h3 class="d-flex justify-content-center">ĐĂNG KÝ</h3>
                <RegisterForm :user="user" @submit:register="register" />
                <p class="msg-error">{{ message }}</p>
                <div class="mt-1 text-center">
                    Bạn đã có tài khoản? <router-link :to="{ name: 'contact.login' }">Đăng Nhập</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import UserService from "@/services/user.service";
import RegisterForm from "@/components/RegisterForm.vue";
import { ref } from 'vue';
import { router } from '@/router';
import { useToast } from 'vue-toast-notification';
let user = ref({});
let message = ref("");
const toast = useToast();
const register = async (data) => {
    try {
        await UserService.register(data);
        toast.success('Đăng ký tài khoản thành công!', { timeout: 1500 });
        router.push({ name: "contact.login" });
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