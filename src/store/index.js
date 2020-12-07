
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  queryInfo: {
    query: "",
    pagenum: 1,
    pagesize:5,
    
  },
  dialogVisible:false,
  userList: [],
  total: 0
}
import {request} from '../NetWork/request'
import  mutations from './mutation'

export default new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  actions: {
    getUserlist(context) {

      request({
        url: "/users",
        params: state.queryInfo,
      }).then((value) => {
        console.log(value)
        if (value.meta.status !== 200) {
          return this.$message.error("用户数据请求失败");
        } else {
          state.total = value.data.total
          state.userList = value.data.users;
          state.total = value.data.total;
        }
      });
    }
  },
  modules: {
  }
})
