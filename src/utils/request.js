import axios from 'axios'
import config from '@/config'
import router from '@/router'
import Store from '@/store'
import merge from 'lodash/merge'
import qs from 'qs'

const http = axios.create({
  // 设置请求超时事件
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

/**
 *  请求拦截
 */
http.interceptors.request.use(config => {
  const token = Store.state.token
  // 每次请求前判断vuex中是否存在token
  // 如果存在 则统一在http请求的header都加上token，这样后台可以判断登录情况
  token && (config.headers.Authorization = token)
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) {
    // 401 token失效 设置token为空
    Store.commit('setToken', '')
    // 路由到登录页
    router.push({name: 'login'})
  }
  return response
}, error => {
  return Promise.reject(error)
})

/**
 *  设置请求路径
 * @param actionUrl  请求资源
 * @returns {*}
 */
http.requestBaseUrl = (actionUrl) => {
  // 开发环境基本地址为本地 8080 端口
  const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
  console.log(baseUrl)
  return baseUrl + actionUrl
}

/**
 *  设置get请求的参数加上当前时间
 * @param params              请求参数
 * @param openDefultParams   是否加上当前事件： 默认true
 * @returns {*}
 */
http.adornGetParams = (params = {}, openDefultParams = true) => {
  let defaults = {
    '_t': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 *  Post请求数据处理
 * @param data              数据对象
 * @param openDefultParams    是否添加时间参数
 * @param contentType       是否是json字符串格式
 * @returns {string}
 */
http.adornPostParams = (data = {}, openDefultParams = true, contentType = 'json') => {
  let defaults = {
    '_t': new Date().getTime()
  }
  data = openDefultParams ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
