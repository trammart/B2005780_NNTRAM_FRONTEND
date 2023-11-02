<template>
    <div class="page row mx-auto">
        <div class="col-md-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4>
                Danh bạ
                <i class="fas fa-address-book"></i>
            </h4>
            <ContactList v-if="filteredContactsCount > 0" :contacts="filteredContacts" v-model:activeIndex="activeIndex" />
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <font-awesome-icon :icon="['fas', 'rotate-right']" /> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddContact">
                    <font-awesome-icon :icon="['fas', 'plus']" /> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllContacts">
                    <font-awesome-icon :icon="['fas', 'trash']" /> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="activeContact">
                <div class="row">
                    <h4 class="col-8">
                    Chi tiết Liên hệ
                    <font-awesome-icon :icon="['fas', 'address-card']" />
                </h4>
                <router-link :to="{
                    name: 'contact.edit',
                    params: { id: activeContact._id },
                }" class="col-4">
                    <span class="mt-2 badge badge-warning">
                        <font-awesome-icon :icon="['fas', 'user-pen']" /> Hiệu chỉnh</span>
                </router-link>
                </div>
                <ContactCard :contact="activeContact" />
            </div>
        </div>
    </div>
</template>
<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";
import { useAuthStore } from '@/stores/auth.store';
import { ref } from 'vue';
export default {
    components: {
        ContactCard,
        InputSearch,
        ContactList,
    },
    data() {
        return {
            contacts: [],
            activeIndex: -1,
            searchText: "",
            user: [],
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
        contactStrings() {
            return this.contacts.map((contact) => {
                const { name, email, address, phone } = contact;
                return [name, email, address, phone].join("");
            });
        },
        // Trả về các contact có chứa thông tin cần tìm kiếm.
        filteredContacts() {
            if (!this.searchText) return this.contacts;
            return this.contacts.filter((_contact, index) =>
                this.contactStrings[index].includes(this.searchText)
            );
        },
        activeContact() {
            if (this.activeIndex < 0) return null;
            return this.filteredContacts[this.activeIndex];
        },
        filteredContactsCount() {
            return this.filteredContacts.length;
        },
    },
    methods: {
        async retrieveContacts() {
            try {
                this.contacts = await ContactService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveContacts();
            this.activeIndex = -1;
        },
        async removeAllContacts() {
            const authStore = useAuthStore();
            this.user = ref(authStore?.user);
            if (this.user) {
                if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                    try {
                        await ContactService.deleteAll();
                        this.$toast.warning('Xóa thành công!', { timeout: 1500 })
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else {
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
        goToAddContact() {
            this.$router.push({ name: "contact.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
};
</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>