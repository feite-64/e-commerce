import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL =
  'https://www.fastmock.site/mock/9d368ec3466bb9fd180e2d326eb4ac3b/vue'
const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        resolve(response)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export { post, get }
