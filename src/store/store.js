import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as user from './modules/user'
import * as event from './modules/event'
import notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification
  },
  state: {
    categories: [
      'Консультация',
      'Хирургия',
      'Лечение кариеса',
      'Ортодонтия',
      'Рентгенодиагностика',
      'Чистка зубов '
    ],
    Registeruser: null
  },
  actions: {
    register({commit}, credentials) {
      return axios.post('http://localhost:5500/register', credentials)
      .then(({data}) => {
        commit('SET_USER_DATA', data)
      })
    },
    login({commit}, credentials) {
      return axios.post('http://localhost:5500/login', credentials)
      .then(({data}) => {
        commit('SET_USER_DATA', data)
      })
    },
    logout({commit}) {
      commit('CLEAR_USER_DATA')
    }
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.Registeruser = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user')
      location.reload()
    }
  }, 
  getters: {
    loggedIn(state) {
      return !!state.Registeruser
    }
  }
})
