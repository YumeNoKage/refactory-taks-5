import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listTodo: []
  },

  getters: {
    listTodo: state => state.listTodo
  },

  mutations: {
    addNewTask: (state, data) => {
      const a = JSON.parse(localStorage.listTask)

      a.push(data)

      localStorage.listTask = JSON.stringify(a)
      console.log(state.listTodo.length)
      state.listTodo = JSON.parse(localStorage.listTask)
    },

    getListTodos: (state, data) => {
      state.listTodo = JSON.parse(data)
    },

    removedTodo: (state, data) => {
      let a = JSON.parse(localStorage.listTask)

      let dataRemove = a.findIndex(element => element == data)

      a.splice(dataRemove, 1)

      localStorage.listTask = a
      state.listTodo = JSON.parse(localStorage.listTask)
    }

  },
  actions: {
    createNewTask: async function ({ commit }, data) {
      await commit('addNewTask', data)
      console.log(data)
    },

    getListTodo({ commit }) {
      console.log(localStorage.listTask)
      if (localStorage.listTask !== undefined) {
        console.log(localStorage.listTask)
        commit('getListTodos', localStorage.listTask)
      } else {
        localStorage.clear()
        localStorage.listTask = JSON.stringify([])
      }
    },

    removeTodo({ commit }, data) {
      console.log(data)
      commit('removedTodo', data)
    }
  },
  modules: {
  }
})


// Code belum selesai