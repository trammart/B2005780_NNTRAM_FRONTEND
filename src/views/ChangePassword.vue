<template>
    <div v-if="user" class="page p-5">
        <h4>Đổi mật khẩu</h4>
        <ChangeForm :user="user" @submit:changePassword="changePass" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ChangeForm from "@/components/ChangePasswordForm.vue";
import UserService from "@/services/user.service";
import { useAuthStore } from '@/stores/auth.store';
export default {
    components: {
        ChangeForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            user: null,
            message: "",
        };
    },
    methods: {
        async getUser(id) {
            try {
                this.user = await UserService.findById(id);
            } catch (error) {
                console.log(error);
            }
        },
        async changePass(data) {
            try {
                await UserService.changePassword(this.user._id, data);
                this.$toast.success('Thay đổi mật khẩu thành công!', { timeout: 1500 });
            } catch (error) {
                console.log(error);
                const errorMessage = error.response.data.message;
                this.$toast.error(errorMessage, { timeout: 4000});
            }
        },

        getAuthStore() {
            const authStore = useAuthStore();
            this.user = authStore?.user;
            if (!this.user) {
                this.$router.push({
                    name: "contact.login",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
    },

    created() {
        this.getUser(this.id);
        this.message = "";
        this.getAuthStore();
    },
};
</script>
