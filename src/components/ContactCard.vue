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
</script>
<script>
export default {
    props: {
        contact: { type: Object, required: true },
    },
};
</script>
<template>
    <div class="card m-b-30">
        <div class="card-body row">
            <div class="col-8 card-title align-self-center mb-0">
                <h5>{{ contact.name }}</h5>
                Liên hệ yêu thích:&nbsp;
                <font-awesome-icon v-if="contact.favorite" :icon="['fas', 'heart']" style="color: crimson;" />
                <font-awesome-icon v-else :icon="['fas', 'user-xmark']" style="color: gray;" />
            </div>
            <div class="col-4">
                <a href=""><img src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg" alt=""
                        class="img-fluid rounded-circle w-60"></a>
            </div>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><font-awesome-icon :icon="['fas', 'envelope']"
                    class="float-right text-primary" /><strong>Email:</strong> <a href="#">{{
                        contact.email }}</a></li>
            <li v-if="user" class="list-group-item"><font-awesome-icon :icon="['fas', 'phone']"
                    class="float-right text-primary" /><strong>Điện thoại:</strong> {{ contact.phone
                    }}</li>
            <li class="list-group-item"><font-awesome-icon :icon="['fas', 'location-dot']"
                    class="float-right text-primary" /><strong>Địa chỉ:</strong> {{ contact.address
                                    }}</li>
        </ul>
</div></template>