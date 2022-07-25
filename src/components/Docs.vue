<template lang="pug">
.loading-wrapper.d-flex.flex-column.justify-content-center(v-if="loading")
  .spinner-border.mb-3.mx-auto.my-md-5.my-3(role="status" style="width: 4rem; height: 4rem")
  h2.visualy-hidden.text-center Загрузка...
.wrapper(v-else)
  .card(v-for="(doc, ind) in docs.slice().reverse()")
    .card-body
      h5.card-title [№{{ docs.length - ind }}] {{ doc.name }}
      span {{ doc.description }}
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      docs: []
    }
  },
  methods: {
    ...mapActions({
      fetchDocs: "task/fetchDocs"
    })
  },
  mounted() {
    this.fetchDocs().then((data) => {
      this.loading = false
      this.docs = data
    }, error => {
      console.log("Docs fetching failed")
    })
  },
}
</script>