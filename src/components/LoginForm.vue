<template>
    <Form @submit="submitLogin" :validation-schema="userFormSchema">
        <div class="row">
            <div class="form-group col-md-12">
                <label for="email">Email</label>
                <Field name="email" type="email" class="form-control" v-model="userLocal.email" />
                <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="form-group col-md-12">
                <label for="password">Mật Khẩu</label>
                <Field name="password" type="password" class="form-control" v-model="userLocal.password" />
                <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-group col-md-12">
                <button class="btn btn-primary w-100 mt-3">
                    Đăng Nhập
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
    emits: ["submit:login"],
    props: {
        user: { type: Object, required: true }
    },
    data() {
        const userFormSchema = yup.object().shape({
            email: yup
                .string()
                .email("E-mail không đúng định dạng.")
                .max(50, "E-mail tối đa 50 ký tự."),
            password: yup
                .string()
        });
        return {
            userLocal: this.user,
            userFormSchema,
        };
    },
    methods: {
        submitLogin() {
            this.$emit("submit:login", this.userLocal);
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>