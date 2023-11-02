<template>
    <Form @submit="submitChange" :validation-schema="userFormSchema">
        <div class="row">
            <div class="form-group col-md-12">
                <label for="old_password">Mật Khẩu Hiện Tại</label>
                <Field name="old_password" type="password" class="form-control" v-model="old_password" />
                <ErrorMessage name="old_password" class="error-feedback" />
            </div>
            <div class="form-group col-md-12">
                <label for="password">Mật Khẩu Mới</label>
                <Field name="password" type="password" class="form-control" v-model="password" />
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-group col-md-12">
                <button class="btn btn-primary w-100 mt-3">
                    Lưu
                </button>
            </div>
        </div>
    </Form>
</template>
  
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:changePassword"],
    props: {
        user: { type: Object, required: true },
    },
    data() {
        const userFormSchema = yup.object().shape({
            old_password: yup.string(),
            password: yup.string(),
        });
        return {
            old_password: "", // Lưu trữ mật khẩu cũ
            password: "",     // Lưu trữ mật khẩu mới
            userFormSchema,
        };
    },
    methods: {
        submitChange() {
            this.$emit("submit:changePassword", {
                currentPassword: this.old_password,
                newPassword: this.password,
            });
        },
    },
};
</script>
  
<style scoped>
@import "@/assets/form.css";
</style>
  