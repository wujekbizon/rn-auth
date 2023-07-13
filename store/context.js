import { createContext, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
})

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState()

  const authenticate = async (token) => {
    setAuthToken(token)
    await SecureStore.setItemAsync('token', token)
  }

  const logout = async () => {
    setAuthToken(null)
    await SecureStore.deleteItemAsync('token')
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
