<template lang="pug">
nav.navbar.navbar-dark.bg-dark.navbar-expand-lg
  .container-fluid.m-2
    router-link(to="/").navbar-brand SHMITCTF
    button.navbar-toggler(type="button" data-bs-toggle="collapse" data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarSupportedContent.collapse.navbar-collapse
      ul.navbar-nav.me-auto.mb-2.mb-lg-0
        li.nav-item(v-for="route in routerLinks" :class="{'dropdown': route.dropdown}")
          router-link.nav-link(v-if="!route.dropdown" :to="route.path") 
            font-awesome-icon(:icon="route.icon")
            |  {{ route.name }}
          a#navbarDropdown.nav-link.dropdown-toggle(v-else href="#" role="button" data-bs-toggle="dropdown" aria-expanded='false')
            font-awesome-icon(:icon="route.icon")
            |  {{ route.name }}
          ul.dropdown-menu.dropdown-menu-dark(aria-labelledby="navbarDropdown")
            li(v-for="item in route.items")
              router-link.dropdown-item.d-flex(:to="'/course/' + item.path" :class="{'disabled':!item.unlocked}")
                span {{ item.name }}
                font-awesome-icon.ms-auto.my-auto(v-if="!item.unlocked" icon="lock")
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
      font-awesome-icon.me-2(v-if="toast.type == 'warning'" icon="triangle-exclamation" style="font-size 20px; color: yellow")
      strong {{ toast.name }}
      button.btn-close.ms-auto(type='button' data-bs-dismiss='toast' aria-label='Close')
    .toast-body
      span {{ toast.message }}
router-view(:key="$route.fullPath" @createToast="createToast" @toggleModal="toggleModal")
</template>
<script>
import Login from "./components/Login.vue"
import Register from "./components/Register.vue"
import Logout from "./components/Logout.vue"
import { Modal, Toast } from "bootstrap/dist/js/bootstrap.esm.js"
import { mapGetters, mapActions } from "vuex"

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
        {dropdown: true, name: "Таски", icon: "list-check", items: []},
        {path: "/leaderboard", name: "Таблица лидеров", icon: "trophy"},
      ],
      routesLoading: true,
    }
  }, 
  computed: {
    ...mapGetters({
      getStatus: "auth/getStatus"
    })
  },
  methods: {
    ...mapActions({
      fetchCourses: "task/fetchCourses"
    }),
    toggleModal({ modalName, create = false }) {
      const modalEl = document.getElementById(modalName)
      const modal = create ? new Modal(modalEl) : Modal.getInstance(modalEl)
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
  },
  mounted() {
    this.fetchCourses().then(
      data => {
        this.routerLinks[1].items = data
        this.routesLoading = false
      },
      (error) => {
        this.routesLoading = false
      }
    )
  },
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