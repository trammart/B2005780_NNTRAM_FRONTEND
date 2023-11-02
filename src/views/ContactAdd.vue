<template>
    <div v-if="contact" class="page">
        <h4>Thêm Liên hệ</h4>
        <ContactForm :contact="contact" @submit:contact="createContact" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';
export default {
    components: {
        ContactForm,
    },
    data() {
        return {
            contact: {},
            message: "",
            user: [],
        };
    },
    methods: {
        async createContact(data) {
            console.log(data);
            try {
                await ContactService.create(data);
                this.$toast.success('Liên hệ được tạo thành công!', { timeout: 1500 })
                this.$router.push({ name: "contactbook" });
            } catch (error) {
                console.log(error);
            }
        },
        getAuthStore() {
            const authStore = useAuthStore();
            this.user = ref(authStore?.user);
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
        this.message = "";
        this.getAuthStore();
    },
};
</script>