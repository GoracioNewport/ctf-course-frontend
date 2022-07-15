<template lang="pug">
nav.navbar.navbar-dark.bg-dark.navbar-expand-lg
  .container-fluid.m-2
    router-link(to="/").navbar-brand GCTFC
    button.navbar-toggler(type="button" data-bs-toggle="collapse" data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarSupportedContent.collapse.navbar-collapse
      ul.navbar-nav.me-auto.mb-2.mb-lg-0
        li.nav-item(v-for="route in routerLinks")
          router-link.nav-link(:to="route.path") 
            font-awesome-icon(:icon="route.icon")
            |  {{ route.name }}
      ul.navbar-nav.mb-2.mb-lg-0(v-if="!getStatus.loggedIn")
        li.nav-item
          a.nav-link(type="button" data-bs-toggle="modal" data-bs-target="#registerModal") 
            font-awesome-icon(icon="user-plus") 
            |  Регистрация
        li.nav-item
          a.nav-link(type="button" data-bs-toggle="modal" data-bs-target="#loginModal") 
            font-awesome-icon(icon="sign-in-alt")
            |  Вход
      ul.navbar-nav.mb-2.mb-lg-0(v-else)
        li.nav-item
          a.nav-link(type="button" data-bs-toggle="modal" data-bs-target="#logoutModal")
            font-awesome-icon(icon="sign-out-alt")
            |  Выход
#loginModal.modal.fade(tabindex='-1' aria-labelledby='loginModalLabel' aria-hidden='true' ref="loginModal")
  .modal-dialog
    .modal-content
      .modal-header
        h5#loginModalLabel.modal-title Вход в аккаунт 
        button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
      .modal-body
        Login(@toggleModal="toggleModal" @createToast="createToast")
#registerModal.modal.fade(tabindex='-1' aria-labelledby='registerModalLabel' aria-hidden='true' ref="registerModal")
  .modal-dialog
    .modal-content
      .modal-header
        h5#registerModalLabel.modal-title Регистрация 
        button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
      .modal-body
        Register(@toggleModal="toggleModal" @createToast="createToast")
#logoutModal.modal.fade(tabindex='-1' aria-labelledby='logoutModalLabel' aria-hidden='true' ref="logoutModal")
  .modal-dialog
    .modal-content
      .modal-header
        h5#logoutModalLabel.modal-title Выход из аккаунта 
        button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
      .modal-body
        Logout(@toggleModal="toggleModal" @createToast="createToast")
.toast-container.position-fixed.bottom-0.end-0.p-3(ref="toastContainer" style="z-index: 1051")
  .toast(role="alert" aria-live="assertive" aria-atomic="true" v-for="toast in toasts" :id="toast.id")
    .toast-header
      font-awesome-icon.me-2(v-if="toast.type == 'success'" icon="check" style="font-size: 20 px; color: green")
      font-awesome-icon.me-2(v-if="toast.type == 'danger'" icon="exclamation" style="font-size: 20 px; color: red")
      strong {{ toast.name }}
      button.btn-close.ms-auto(type='button' data-bs-dismiss='toast' aria-label='Close')
    .toast-body
      span {{ toast.message }}
router-view
</template>
<script>
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"
import Logout from "./components/Logout.vue"
import { Modal, Toast } from "bootstrap/dist/js/bootstrap.esm.js"
import { mapGetters } from "vuex"

export default {
  components: {
    Login,
    Register,
    Logout,
  },
  data() {
    return {
      toasts: [],
      routerLinks: [
        {path: "/docs", name: "Материалы", icon: "book"},
        {path: "/tasks", name: "Таски", icon: "list-check"},
        {path: "/leaderboard", name: "Таблица лидеров", icon: "trophy"},
      ]
    }
  },
  computed: {
    ...mapGetters({
      getStatus: "auth/getStatus"
    })
  },
  methods: {
    toggleModal(modalName) {
      const modalEl = document.getElementById(modalName)
      const modal = Modal.getInstance(modalEl)
      modal.toggle()
    },
    createToast({name, message, type}) {
      let id = 'toast' + this.toasts.length
      this.toasts.push({
        id, 
        name,
        message,
        type
      })

      setTimeout(() => this.showToast(id), 10) 
    },
    showToast(id) {
      const toastEl = document.getElementById(id)
      const toast = new Toast(toastEl)
      toast.show()
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>