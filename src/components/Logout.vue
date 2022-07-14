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
      this.$emit('toggleModal', 'logoutModal')  
    },
    logout() {
      this.authLogout()
      this.$router.go()  
    }
  },
}
</script>