import http from '../../utils/request'

export default {
  state: {
    /**
     * jwt令牌
     */
    token: '',
    username: '',
    userId: '',
    access: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUsername (state, username) {
      state.username = username
    },
    setUserId (state, userId) {
      state.userId = userId
    },
    /**
     *  设置权限
     * @param state
     * @param access
     */
    setAccess (state, access) {
      state.access = access
    }
  },
  getters: {
    token: state => {
      return state.token
    }
  },
  actions: {
    /**
     *  登录请求
     * @param commit
     * @param username 用户名
     * @param password  密码
     * @param captcha   验证码
     * @returns {Promise<null>}
     */
    loginSubmit ({commit}, {username, password, captcha}) {
      username = username.trim()
      password = password.trim()
      return new Promise((resolve, reject) => {
        http({
          url: http.requestBaseUrl('/sys/login'),
          data: http.adornPostParams({
            'username': username,
            'password': password,
            'captcha': captcha
          })
        }).then(res => {
          const data = res.data
          commit('setToken', data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    /**
     *  通过 token 请求后台获取用户信息
     * @param state
     * @param commit
     * @returns  userinfo
     */
    getUserInfo ({state, commit}) {
      return new Promise((resolve, reject) => {
        http({
          url: http.requestBaseUrl('/getUserInfo'),
          method: 'get',
          param: http.adornGetParams({'token': state.token})
        }).then(res => {
          const data = res.data
          commit('setUsername', data.username)
          commit('setUserId', data.userId)
          commit('setAccess', data.access)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
