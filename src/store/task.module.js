import TaskService from "../services/task.service";

export const task = {
  namespaced: true,
  state: {
    courses: [],
  },
  actions: {
    fetchCourses({ commit }) {
      return TaskService.getCourses().then(
        ({ data }) => {
          commit('setCourses', data)
          return Promise.resolve(data)
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    setCourses(state, data) {
      state.courses = data
    }
  },
  getters: {
    getCourses(state) {
      return state.courses
    }
  }

}