import axios from 'axios'
const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'


export const authenticate = async (mode, email, password) => {
  const response = await axios.post(`${BASE_URL}${mode}?key=${API_KEY}`, {
    email,
    password,
    returnSecureToken: true,
  })
  const token = response.data.idToken
  return token
}

export const createUser = (email, password) => {
  return authenticate('signUp', email, password)
}

export const loginUser = (email, password) => {
  return authenticate('signInWithPassword', email, password)
}
