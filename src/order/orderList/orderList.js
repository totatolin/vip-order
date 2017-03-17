import axios from 'axios'
import url from '../../config/url.js'

export function initData () {
  return new Promise((resolve, reject) => {
    axios.get(`${url.java_url}/Order/web/express/selectByShopIdAndMode?id=wdNi-cHRgHQtejZ7O2OsrynA&pageSize=50`)
    .then((res) => {
      resolve(res)
    })
    .catch((err) => {
      reject(err)
    })
  })
}
