<template lang="pug">
.loading-wrapper.d-flex.flex-column.justify-content-center(v-if="loading")
  .spinner-border.mb-3.mx-auto.my-md-5.my-3(role="status" style="width: 4rem; height: 4rem")
  h2.visualy-hidden.text-center Загрузка...
.wrapper(v-else)
  .error-wrapper.d-flex.flex-column(v-if="error")
    font-awesome-icon.mx-auto.my-md-5.my-1(:icon="icon" style="font-size: 7em")
    h2.text-center.mx-auto {{ message }}
  .content-wrapper.table-responsive-md(v-else)
    table.table.table-striped.table-hover.table-bordered
      thead
        tr
          th(scope="col") #
          th(scope="col") Название
          th(scope="col") Стоимость
          th(scope="col") Решений
          th(scope="col") Вердикт
      tbody
        tr(v-for="(task, ind) in tasks" :class="{'table-danger': solveStatus[task.id] == 1, 'table-success': solveStatus[task.id] == 2}")
          th(scope="row") {{ ind }}
          td {{ task.name }}
          td {{ task.weight }}
          td {{ task.solved }}
          td
            span(v-if="solveStatus[task.id] == 1") Неправильный ответ
            span(v-else-if="solveStatus[task.id] == 2") Принято
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      error: false,
      message: "",
      icon: "faBug",
      tasks: [],
      solveStatus: []
    }
  },
  methods: {
    ...mapActions({
      fetchTasks: "task/fetchTasks",
      fetchSolveStatus: "task/fetchSolveStatus",
    })
  },
  async mounted() {
    this.fetchSolveStatus().then(
      data => {
        this.solveStatus = data
      },
      error => {
        console.log("Failed fetching solve status: ", error)
      }
    )
    this.fetchTasks(this.$route.params.name).then(
      data => {
        this.loading = false
        this.error = false
        this.tasks = data
      },
      error => {
        console.log("Failed fetching tasks: ", error)
        this.loading = false
        this.error = true
        
        if (!error.response || !error.response.status) {
          this.icon = "bug"
          this.message = "Произошла неизвестная ошибка :("
        } else {
          if (error.response.status == 404) {
            this.icon = "magnifying-glass"
            this.message = "Такого курса нет! По крайней мере, Я не смог его найти..."
          } else if (error.response.status == 418) {
            this.icon = "mug-hot"
            this.message = "Хорошая попытка. Но нет :)"
          } else {
            this.icon = "bug"
            this.message = "Произошла неизвестная ошибка :("
          }
        }
      }
    )
  }
}
</script>