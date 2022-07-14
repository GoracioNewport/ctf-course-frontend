<template lang="pug">
.row
  button.btn.btn-secondary.col.mx-3(@click="closeModal") Отмена
  button.btn.btn-primary.col.mx-3(@click="logout") Выйти
</template>

<script>
import { mapActions } from "vuex"
export default {
  methods: {
    ...mapActions({
      authLogout: "auth/logout",
    }),
    closeModal() {
      this.$emit('closeModal')  
    },
    logout() {
      this.authLogout()
      this.$router.go()  
    }
  },
}
</script>