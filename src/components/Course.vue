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
        tr(v-for="(task, ind) in tasks" :class="{'table-danger': solveStatus[task.id] == 1, 'table-success': solveStatus[task.id] == 2}" @click="openTask(ind)")
          th(scope="row") {{ ind }}
          td {{ task.name }}
          td {{ task.weight }}
          td {{ task.solved }}
          td
            span(v-if="solveStatus[task.id] == 1") Неправильный ответ
            span(v-else-if="solveStatus[task.id] == 2") Принято


#taskModal.modal.fade(v-if="!loading && !error" tabindex='-1' aria-labelledby='taskModalLabel' aria-hidden='true' ref="taskModal")
  .modal-dialog.modal-dialog-centered
    .modal-content
      .modal-header
        h5#taskModalLabel.modal-title <strong> Таск: </strong> {{ tasks[selectedTaskInd].name }}
        button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
      .modal-body
        span <strong> Описание: </strong> {{ tasks[selectedTaskInd].description }}
        br
        span <strong> Стоимость: </strong> {{ tasks[selectedTaskInd].weight }}
        br
        span <strong> Решений: </strong> {{ tasks[selectedTaskInd].solved }}
        br
        span <strong> Вердикт: </strong> 
        span(v-if="solveStatus[tasks[selectedTaskInd].id] == 1" style="color: red") Неправильный ответ 
        span(v-else-if="solveStatus[tasks[selectedTaskInd].id] == 2" style="color: green") Принято
        span(v-else) Не решено
      .modal-footer
        .input-group.mb-3
          input.form-control(type='text' placeholder="gctf_" aria-label="Флаг" aria-describedby='sendFlagButton' :disabled="loadingAnswer || solveStatus[tasks[selectedTaskInd].id] == 2" v-model="taskAnswer" :class="{'is-invalid': wrongAnswer, 'is-valid': rightAnswer }")
          button#sendFlagButton.btn.btn-primary(:disabled="loadingAnswer || solveStatus[tasks[selectedTaskInd].id] == 2" @click="sendAnswer(taskAnswer, tasks[selectedTaskInd].id)")
            span.spinner-border.spinner-border-sm.me-2(v-show="loadingAnswer")
            span Сдать флаг
        
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Modal } from "bootstrap/dist/js/bootstrap.esm.js"
import { h } from '@vue/runtime-core'
export default {
  emits: ["createToast", "toggleModal"],
  data() {
    return {
      loading: true,
      loadingAnswer: false,
      error: false,
      message: "",
      icon: "bug",
      tasks: [],
      solveStatus: [],
      selectedTaskInd: 0,
      taskAnswer: "",
      wrongAnswer: false,
      rightAnswer: false,
    }
  },
  computed: {
    ...mapGetters({
      getSolveStatus: "task/getSolveStatus",
    })
  },
  methods: {
    ...mapActions({
      fetchTasks: "task/fetchTasks",
      fetchSolveStatus: "task/fetchSolveStatus",
      sendAnswerStore: "task/sendAnswer",
      authLogout: "auth/logout",
    }), 
    openTask(id) {
      this.taskAnswer = ""
      this.selectedTaskInd = id
      this.wrongAnswer = false
      this.rightAnswer = false
      const modalEl = document.getElementById("taskModal")
      const modal = new Modal(modalEl)
      modal.toggle()
    },
    sendAnswer(answer, taskId) {
      this.loadingAnswer = true;
      this.wrongAnswer = false
      this.rightAnswer = false
      this.sendAnswerStore({ answer, taskId }).then(
        data => {
          this.$emit("createToast", {name: "Вердикт", message: "Правильный ответ!", type: "success"}) 

          this.tasks[this.selectedTaskInd].solved += 1
          this.rightAnswer = true
          this.solveStatus = this.getSolveStatus
          this.loadingAnswer = false        
        },
        error => {
          let modalMessage = "Ошибка отправки ответа! Код: " + error.response.status

          if (error.response.status == 403) {
            modalMessage = "Неправильный ответ :("
            this.wrongAnswer = true
          } else if (error.response.status == 401) {
            this.handleExpiredSession()
          }

          this.$emit("createToast", {name: "Вердикт", message: modalMessage, type: "danger"})
          this.solveStatus = this.getSolveStatus
          this.loadingAnswer = false
        }
      )
    },
    toggleModal(modalName = "registerModal", create = false) {
      this.$emit("toggleModal", { modalName, create })
    },
    handleExpiredSession() {
      this.toggleModal("loginModal", true)
      this.$emit("createToast", {name: "Авторизация", message: "Пожалуйста, войдите в аккаунт!", type: "warning"})
      this.authLogout()
      this.$router.push("/")
    }
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
        this.tasks = data
        this.loading = false
        this.error = false 
      },
      error => {
        console.log("Failed fetching tasks: ", error)
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
          } else if (error.response.status == 401) {
            this.handleExpiredSession() 
          } else {
            this.icon = "bug"
            this.message = "Произошла неизвестная ошибка :("
          }
        }

        this.loading = false
      }
    )
  }
}
</script>