import axios from 'axios'
import url from '../../config/url.js'

export function initData (id, tel, date, status) {
  return new Promise((resolve, reject) => {
    axios.get(`${url.java_url}/Order/web/express/selectByShopIdAndMode?id=${id}&pageSize=50&tel=${tel}&date=${date}&status=${status}`)
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reject(err)
    })
  })
}
