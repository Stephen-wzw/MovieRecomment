import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId:'',
    username: '',
    userimg:'',
  },
  mutations: {
    // 存储登录信息
    login(state, data){
      state.userId = data.userId;
      state.username = data.username;
      state.userimg = data.userimg;
    }
  },
  actions: {
  },
  modules: {
  }
})
