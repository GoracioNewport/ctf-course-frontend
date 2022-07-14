<template lang="pug">
Form.needs-validation.m-3(@submit="handleLogin(username, password, remember)" :validation-schema="validationSchema" v-slot="{errors}" ref="form")
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
    .form-check.form-switch.col.m-auto
      input#checkInput.form-check-input(type='checkbox' role="switch" v-model="remember")
      label.form-check-label.m-auto(for='checkInput') Запомнить меня 
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
      remember: false,
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
      this.$emit("toggleModal", "loginModal")
    },
    handleLogin(username, password, remember) {
      this.loading = true;
      this.error = false;
      this.message = ""
      this.login({'username': username, 'password': password, 'remember': remember}).then(
        () => {
          this.loading = false
          this.toggleModal()
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
          
          if (error.response.status == 401) {
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