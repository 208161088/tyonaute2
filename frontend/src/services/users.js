import axios from 'axios'
const baseUrl = '/api/users'

let token = null
const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const changeInformation = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.put(baseUrl+'/information', newObject, config)
  return response.data
}

const changePassword = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.put(baseUrl+'/password', newObject, config)
  return response.data
}

const order = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.put(baseUrl+'/order', newObject, config)
  return response.data
}

//const remove = async (newObject) => {
const remove = async () => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.delete(baseUrl+'/delete', config)
  return response.data
}
export default {create, setToken, changeInformation, changePassword, order, remove }