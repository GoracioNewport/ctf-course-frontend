<template lang="pug">
Form.needs-validation.m-3(@submit="handleLogin(username, password)" :validation-schema="validationSchema" v-slot="{errors}" ref="form")
  .mb-3
    label.form-label(for='usernameInput') Имя пользователя
    Field#usernameInput.form-control(:class="{'is-invalid': errors.username}" name="username" type='username' required v-model="username")
    .invalid-feedback
      span {{ errors.username }}
  .mb-3
    label.form-label(for='passwordInput') Пароль
    Field#passwordInput.form-control(:class="{'is-invalid': errors.password}" name="password" type='password' required v-model="password")
    .invalid-feedback
      span {{ errors.password }}
  .row.m-0.pt-4 
    button.btn.btn-primary.col(:disabled="loading") 
      span.spinner-border.spinner-border-sm.me-2(v-show="loading")
      span Войти
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"
import { mapGetters, mapActions } from 'vuex'
import * as yup from "yup"

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const validationSchema = yup.object().shape({
      username: yup
        .string()
        .required("Это поле обязательно!"),
      password: yup
        .string()
        .required("Это поле обязательно!")
    });
    return {
      validationSchema,
      loading: false,
      message: "",
      username: "",
      password: "",
      remember: true,
      error: false,
    }
  },
  computed: {
    ...mapGetters({
      getStatus: 'auth/getStatus',
      getUser: 'auth/getUser'
    })
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    toggleModal() {
      this.$emit("toggleModal", { modalName: "loginModal" })
    },
    handleLogin(username, password, remember = true) {
      this.loading = true;
      this.error = false;
      this.message = ""
      this.login({'username': username, 'password': password, 'remember': remember}).then(
        () => {
          this.loading = false
          this.toggleModal()
          this.$emit("createToast", {name: "Вход", message: "Вы успешно вошли в аккаунт!", type: "success"}) 
        },
        (error) => {
          this.loading = false;
          this.error = true;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          
          this.$emit("createToast", {name: "Вход", message: "Ошибка входа в аккаунт :(", type: "danger"})
          if (error.response && error.response.status == 401) {
            this.$refs.form.setErrors({
              username: ["Неправильное имя пользователя..."],
              password: ["...или пароль :)"]
            })
          }
        }
      );
    },
  },
  
}
</script>