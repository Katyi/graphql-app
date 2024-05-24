import axios from 'axios'

const baseURL = 'http://localhost:3000';

export const getAllUsers = async() => {
  let response = await axios.get(`${baseURL}/users`)
  return response.data
}

export const getUserFriends = async(id) => {
  let response = await axios.get(`${baseURL}/users/${id}`)
  return response.data
}

export const createUser = async(data) => {
  data.friends = data.friends ? data.friends.map(id => ({ id })) : []
  let response = await axios.post(`${baseURL}/users`, data)
  return response.data
}