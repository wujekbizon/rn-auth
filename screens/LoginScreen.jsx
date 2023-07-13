import { useState, useContext } from 'react'
import { Alert } from 'react-native'
import AuthContent from '../components/Auth/AuthContent'
import { loginUser } from '../util/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { AuthContext } from '../store/context'

function LoginScreen() {
  const authCtx = useContext(AuthContext)
  const { authenticate } = authCtx
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true)
    try {
      const authToken = await loginUser(email, password)
      authenticate(authToken)
    } catch (error) {
      Alert.alert('Authentication failed!', 'Could not log you in. Please check your credentials')
      setIsAuthenticating(false)
    }
  }

  return (
    <>
      {isAuthenticating ? (
        <LoadingOverlay message="Logging you in..." />
      ) : (
        <AuthContent isLogin onAuthenticate={loginHandler} />
      )}
    </>
  )
}

export default LoginScreen
