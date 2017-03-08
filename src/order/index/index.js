import axios from 'axios'
import url from '../../config/url.js'

export function getCode (tel) {
  return new Promise((resolve, reject) => {
    axios.get(`${url.java_url}/merchant/shop/sendCode?tel=${tel}`)
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

export function login (tel, code) {
  return new Promise((resolve, reject) => {
    let postData = {
      tel: tel,
      password: code,
      device_id: '1000'
    }
    axios.post(`${url.java_url}/merchant/shop/login`, postData)
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reject(err)
    })
  })
}
