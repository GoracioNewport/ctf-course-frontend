<template lang="pug">
.row
  button.btn.btn-secondary.col.mx-3(@click="toggleModal") Отмена
  button.btn.btn-primary.col.mx-3(@click="logout") Выйти
</template>

<script>
import { mapActions } from "vuex"
export default {
  methods: {
    ...mapActions({
      authLogout: "auth/logout",
    }),
    toggleModal() {
      this.$emit('toggleModal', { modalName: 'logoutModal' })  
    },
    logout() {
      this.authLogout()
      this.toggleModal()
      this.$router.push("/") 
      this.$emit("createToast", {name: "Выход", message: "Вы успешно вышли из аккаунта!", type: "success"})
    }
  },
}
</script>