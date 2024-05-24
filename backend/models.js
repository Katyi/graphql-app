import axios from 'axios'

const baseURL = 'http://localhost:3000';

export const createUser = async(data) => {
  data.friends = data.friends ? data.friends.map(id => ({ id })) : []
  let response = await axios.post(`${baseURL}/users`, data)
  return response.data
}

export const getAuthors = async() => {
  let response = await axios.get(`${baseURL}/authors`)
  return response.data
}
export const getBooks = async() => {
  let response = await axios.get(`${baseURL}/books`)
  return response.data
}

export const getAuthor = async(id) => {
  let response = await axios.get(`${baseURL}/authors/${id}`)
  return response.data
}

export const getBook = async(id) => {
  let response = await axios.get(`${baseURL}/books/${id}`)
  return response.data
}

export const getAuthorBooks = async(id) => {
  let response = await axios.get(`${baseURL}/books`)
  return response.data.filter(book => book.authorId === id)
}

export const getBookAuthor = async(authorId) => {
  let response = await axios.get(`${baseURL}/authors`)
  return response.data.filter(author => author.id === authorId)
}

export const createAuthor = async(data) => {
  let response = await axios.post(`${baseURL}/authors`, data)
  return response.data
}
export const createBook = async(data) => {
  let response = await axios.post(`${baseURL}/books`, data)
  return response.data
}

export const updateAuthor = async(id, data) => {
  let response = await axios.patch(`${baseURL}/authors/${id}`, data)
  return response.data
}

export const updateBook = async(id, data) => {
  let response = await axios.patch(`${baseURL}/books/${id}`, data)
  return response.data
}

export const deleteAuthor = async(id) => {
  let response = await axios.delete(`${baseURL}/authors/${id}`)
  return response.data
}

export const deleteBook = async(id) => {
  let response = await axios.delete(`${baseURL}/books/${id}`)
  return response.data
}