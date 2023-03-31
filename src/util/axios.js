import { ElMessage } from "element-plus";
import axios from 'axios'


// const noTokenService = axios.create({
//   baseURL: "http://127.0.0.1:8080", // url = base url + request url
//   timeout: 5000, // request timeout
//   headers: {
//     get: {
//     //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//       // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
//     },
//     post: {
//       // 'token':localStorage.getItem('token')
//     // 'Access-Control-Allow-Origin': '*'
//       // 'Content-Type': 'application/json;charset=utf-8'
//       // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
//     }
// },

// })

const service = axios.create({
  baseURL: "http://127.0.0.1:8080", // url = base url + request url
  timeout: 500000, // request timeout
  headers: {
    get: {
      'token':localStorage.getItem('token')
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      'token':localStorage.getItem('token')
      // 'token':localStorage.getItem('token'),
    // 'Access-Control-Allow-Origin': '*'
      // 'Content-Type': 'multipart/form-data'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    }
},


})



// const fileService = axios.create({
//   baseURL: "http://127.0.0.1:8080", // url = base url + request url
//   timeout: 5000, // request timeout
//   headers: {
//     get: {
//       'token':localStorage.getItem('token')
//     //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//       // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
//     },
//     post: {
//       'token':localStorage.getItem('token'),
//     // 'Access-Control-Allow-Origin': '*'
//       'Content-Type': 'multipart/form-data'
//       // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
//     }
// },


// })





// service.interceptors.request.use(
//   config => {
//     if (store.getters.token) {
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     console.log(error) // for debug
//     return Promise.reject(error)
//   },
// )


//响应拦截器
service.interceptors.response.use(
  response => {

   if(response.status!=200){
      // console.log('接口信息报错',response.status)
      ElMessage({
        showClose: true,
        message: "接口连接失败",
        type: "error",
      });
      return Promise.reject(new Error(response.status || 'Error'))
    }


    // console.debug({response});
    const res = response.data


    if(res.pageNum !=null){
      return res;
    }

    if (!res.success) {
      
      console.log(res)


      switch(res.errorCode){
        default: 
         //连接成功 但是有问题
         ElMessage({
          showClose: true,
          message: res.msg,
          type: "error",
        });
        break;
        case 100:
        break;
      }
       
    } 
    return res;


  },
  error => {
    ElMessage({
      showClose: true,
      message: "接口错误",
      type: "error",
    });
    return Promise.reject(error)
  },
)

export default service;



