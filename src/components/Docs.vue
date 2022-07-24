<template lang="pug">
.wrapper
  span пипириу пирипиум пум
</template>
<script>
export default {
  mounted() {
    alert("Я еще не доделал этот раздел. Вернитесь попозже, пожалуйста :)")
    this.$router.push("/")
  },
}
</script>