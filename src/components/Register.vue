<template lang="pug">
Form.needs-validation.m-3(@submit="handleRegister(username, password)" :validation-schema="validationSchema" v-slot="{errors}" ref="form")
  .mb-3
    label.form-label(for='usernameInput') Имя пользователя
    Field#usernameInput.form-control(:class="{'is-invalid': errors.username, 'is-valid': !errors.username && username}" name="username" type='username' required v-model="username")
    .invalid-feedback
      span {{ errors.username }}
  .mb-3
    label.form-label(for='passwordInput') Пароль
    Field#passwordInput.form-control(:class="{'is-invalid': errors.password, 'is-valid': !errors.password && password}" name="password" type='password' required v-model="password")
    .invalid-feedback
      span {{ errors.password }}
  .mb-3
    label.form-label(for='repeatPasswordInput') Повторите пароль
    Field#repaetPasswordInput.form-control(:class="{'is-invalid': errors.repeatPassword, 'is-valid': !errors.repeatPassword && repeatPassword}" name="repeatPassword" type='password' required v-model="repeatPassword")
    .invalid-feedback
      span {{ errors.repeatPassword }}
  .row.m-0.pt-0
    button.btn.btn-primary.col(:disabled="loading")
      span.spinner-border.spinner-border-sm.me-2(v-show="loading")
      span Зарегистрироваться
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate"
import * as yup from "yup"
import { mapActions } from "vuex"
export default {
  emits: ["toggleModal", "createToast"],
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const validationSchema = yup.object().shape({
      username: yup
        .string()
        .required("Это поле обязательно!")
        .max(30, "Максимальная длина - 30!"),
      password: yup
        .string()
        .required("Это поле обязательно!")
        .min(6, "Минимальная длина - 6!")
        .max(50, "Максимальная длина - 50!"),
      repeatPassword: yup
        .string()
        .required("Это поле обязательно!")
        .oneOf([yup.ref('password'), null], "Пароли должны совпадать!")
    });
    return {
      loading: false,
      message: "",
      username: "",
      password: "",
      repeatPassword: "",
      validationSchema,
      successful: false,
    }
  },
  methods: {
    ...mapActions({
      register: "auth/register",
    }),
    handleRegister(username, password) {
      this.successful = false
      this.message = ""
      this.loading = true
      this.register({'username': username, 'password': password}).then(
        (data) => {
          this.message = "Регистрация успешна!" 
          this.successful = true
          this.loading = false
          this.toggleModal()
          this.toggleModal("loginModal", true)
          this.$emit("createToast", {name: "Регистрация", message: "Аккаунт успешно зарегистрирован! Теперь войдите в него :)", type: "success"})
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;

          let toastMessage = "Ошибка регистрации"
          console.log(error)
          if (error.response && error.response.status) toastMessage += ". Код: " + error.response.status
          
          if (error.response && error.response.status == 400) {
            this.$refs.form.setErrors({
              username: ['Пользователь существует!']
            })
          }

          this.$emit("createToast", {name: "Регистрация", message: toastMessage, type: "danger"})
        }
      )
    },
    toggleModal(modalName = "registerModal", create = false) {
      this.$emit("toggleModal", { modalName, create })
    }
  }
}
</script>