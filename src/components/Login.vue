<template lang="pug">
form.needs-validation.m-3(@submit.prevent="handleLogin(username, password, remember)")
  .mb-3
    label.form-label(for='usernameInput') Имя пользователя
    input#usernameInput.form-control(:class="{'is-invalid': error}" type='username' required v-model="username")
  .mb-3
    label.form-label(for='passwordInput') Пароль
    input#passwordInput.form-control(:class="{'is-invalid': error}" type='password' required v-model="password")
  .row.m-0.pt-4
    .form-check.col.m-auto
      input#checkInput.form-check-input(type='checkbox' v-model="remember")
      label.form-check-label.m-auto(for='checkInput') Запомнить меня 
    button.btn.btn-primary.col(:disabled="loading") 
      span.spinner-border.spinner-border-sm.me-2(v-show="loading")
      span Войти
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
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
    closeModal() {
      this.$emit("closeModal")
    },
    handleLogin(username, password, remember) {
      this.loading = true;
      this.error = false;
      this.message = ""
      this.$store.dispatch("auth/login", {'username': username, 'password': password, 'remember': remember}).then(
        () => {
          this.loading = false
          this.closeModal()
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
        }
      );
    },
  },
  
}
</script>