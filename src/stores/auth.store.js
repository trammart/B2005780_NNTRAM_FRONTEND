import { defineStore } from 'pinia';
import { router } from '@/router';
import UserService from "@/services/user.service";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user'))
    }),
    actions: {
        async loginStore(data) {
            try {
                const signedInUser = await UserService.login(data);
                if (signedInUser?._id) {
                    this.user = signedInUser;
                    localStorage.clear();
                    localStorage.setItem('user', JSON.stringify(this.user));
                    router.push({ name: "contactbook" });
                }
            } catch (error) {
                console.log(error);
            }
        },
        logoutStore() {
            this.user = null;
            localStorage.removeItem('user');
            router.push({ name: "contact.login" });
        }
    },
    persist: true,
});