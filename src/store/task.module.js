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
          commit('setSolveStatus', data)
          return Promise.resolve(data)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    sendAnswer({ commit }, { answer, taskId }) {
      return UserService.sendAnswer(answer, taskId).then(
        data => {
          commit('setIndividualSolveStatus', { ind: taskId, status: 2 })
          return Promise.resolve(data)
        },
        error => {
          commit('setIndividualSolveStatus', { ind: taskId, status: 1 })
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
    },
    setIndividualSolveStatus(state, { ind, status }) {
      state.solveStatus[ind] = status
      console.log(state.solveStatus)
      console.log(ind, status)
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