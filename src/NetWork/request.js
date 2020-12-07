import axios from 'axios'

export function request(config){
    //创建axios的实例


    const instance = axios.create({
        baseURL: 'http://119.23.53.78:8888/api/private/v1/',
        timeout:5000
    })

    //请求拦截
    instance.interceptors.request.use(config => {

        config.headers.Authorization = window.sessionStorage.getItem('token');
        return config
    })

    instance.interceptors.response.use(value=>{
        return value.data
    },reson=>{
        console.log(reson)
    })

    //发生真正的网络请求
    return instance(config)
}