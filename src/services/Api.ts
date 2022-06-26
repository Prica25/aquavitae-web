import axios from 'axios'

export default () => {
  let cliente = axios.create({
    baseURL: 'http://aquavitae.prica.pt/',
    // headers: { Authorization: `Bearer ${store.state.setToken}` },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  return cliente
}
