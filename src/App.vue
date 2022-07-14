<template lang="pug">
nav.navbar.navbar-dark.bg-dark.navbar-expand-lg
  .container-fluid.m-2
    router-link(to="/").navbar-brand GCTFC
    button.navbar-toggler(type="button" data-bs-toggle="collapse" data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarSupportedContent.collapse.navbar-collapse
      ul.navbar-nav.me-auto.mb-2.mb-lg-0
        li.nav-item
          router-link.nav-link(to='/') Home
        li.nav-item
          router-link.nav-link(to='/') Features
        li.nav-item 
          router-link.nav-link(to='/') Pricing
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
        Login(@toggleModal="toggleModal")
#registerModal.modal.fade(tabindex='-1' aria-labelledby='registerModalLabel' aria-hidden='true' ref="registerModal")
  .modal-dialog
    .modal-content
      .modal-header
        h5#registerModalLabel.modal-title Регистрация 
        button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
      .modal-body
        Register(@toggleModal="toggleModal")
#logoutModal.modal.fade(tabindex='-1' aria-labelledby='logoutModalLabel' aria-hidden='true' ref="logoutModal")
  .modal-dialog
    .modal-content
      .modal-header
        h5#logoutModalLabel.modal-title Выход из аккаунта 
        button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
      .modal-body
        Logout(@toggleModal="toggleModal")

router-view
</template>
<script>
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"
import Logout from "./components/Logout.vue"
import { Modal } from "bootstrap/dist/js/bootstrap.esm.js"
import { mapGetters } from "vuex"

export default {
  components: {
    Login,
    Register,
    Logout,
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
  color: #222b35;
}
</style>
