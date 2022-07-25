<template lang="pug">
.loading-wrapper.d-flex.flex-column.justify-content-center(v-if="loading")
  .spinner-border.mb-3.mx-auto.my-md-5.my-3(role="status" style="width: 4rem; height: 4rem")
  h2.visualy-hidden.text-center Загрузка...
.wrapper(v-else) 
  table.table.table-bordered
      thead
        tr
          th(scope="col") Пользователь
          th(score="col" v-for="course in courses") {{ course.name }}
          th(scope="col") Итог
      tbody
        tr(v-for="(user, ind) in users")
          th(scope="row") 
            font-awesome-icon.me-2(v-if="ind == 0" icon="trophy" style="color: gold") 
            font-awesome-icon.me-2(v-else-if="ind < 3" icon="medal" style="color: silver")
            font-awesome-icon.me-2(v-else-if="ind < 5" icon="award" style="color: sienna")
            span {{ user.name }}
          td(v-for="score in user.solved") {{ score }}
          td {{ user.totalScore }}
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      users: [],
      courses: [],
    }
  },
  mounted() {
    this.fetchLeaderboard().then(data => { 
      this.courses = data.courses
      
      let users = []
      data.users.forEach(el => {
        let scoring = []
        let sum = 0
        data.courses.forEach(course => {
          scoring.push(el.score[course.id])
          sum += el.score[course.id]
        }) 

        if (el.username != "GoracioNewport") {
          users.push({
            name: el.username,
            solved: scoring,
            totalScore: sum,
          })
        }

      });

      this.users = users
      this.users.sort(function(a, b) {
        return a.totalScore < b.totalScore
      })

      this.loading = false
    }, 
    error => {
      this.$router.push("/")
    })
  },
  methods: {
    ...mapActions({
      fetchLeaderboard: "task/fetchLeaderboard",
    })
  }
}
</script>