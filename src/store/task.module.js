import TaskService from "../services/task.service";
import UserService from "../services/user.service";

export const task = {
  namespaced: true,
  state: {
    courses: [],
    tasks: [],
    solveStatus: [],
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
    },
    fetchTasks({ commit }, path) {
      return TaskService.getTasks(path).then(
        ({ data }) => {
          commit('setTasks', data)
          return Promise.resolve(data)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    fetchSolveStatus({ commit }) {
      return UserService.getSolveStatus().then(
        ({ data }) => {
          let listData = JSON.parse(data)
          commit('setSolveStatus', listData)
          return Promise.resolve(listData)
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
    },
    setTasks(state, data) {
      state.tasks = data
    },
    setSolveStatus(state, data) {
      state.solveStatus = data
    }
  },
  getters: {
    getCourses(state) {
      return state.courses
    },
    getTasks(state) {
      return state.tasks
    },
    getSolveStatus(state) {
      return state.solveStatus
    },
  }

}