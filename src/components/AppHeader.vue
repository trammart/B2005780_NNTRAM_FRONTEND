<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'contactbook' }" class="nav-link">
                    Danh bạ
                    <font-awesome-icon :icon="['fas', 'address-book']" />
                </router-link>
            </li>
        </div>
        <div class="ml-auto navbar-nav">

            <li v-if="user" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
                    {{ user?.name }}
                </a>
                <div class="dropdown-menu">
                    <router-link :to="{
                        name: 'user.change',
                        params: { id: user?._id },
                    }" class="dropdown-item">Đổi mật khẩu</router-link>
                </div>
            </li>
            
            <li v-if="user" class="nav-item">
                <span v-on:click="logout" class="nav-link cursor-pointer">
                    Đăng Xuất
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                </span>
            </li>
            <li v-if="!user" class="nav-item">
                <router-link :to="{ name: 'contact.login' }" class="nav-link">
                    Đăng Nhập
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                </router-link>
            </li>
            <li v-if="!user" class="nav-item">
                <router-link :to="{ name: 'contact.register' }" class="nav-link">
                    Đăng Ký
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
let user = ref(authStore?.user);
watch(
    [authStore],
    () => {
        user.value = authStore?.user;
    },
    { deep: true }
);
const logout = async () => {
    await authStore.logoutStore();
}
</script>
<style>
.cursor-pointer {
    cursor: pointer;
}

.cursor-context-menu {
    cursor: context-menu;
}
</style>