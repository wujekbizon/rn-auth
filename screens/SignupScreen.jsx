import { useState, useContext } from 'react'
import { Alert } from 'react-native'

import AuthContent from '../components/Auth/AuthContent'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { createUser } from '../util/auth'
import { AuthContext } from '../store/context'

function SignupScreen() {
  const authCtx = useContext(AuthContext)
  const { authenticate } = authCtx
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const signupHandler = async ({ email, password }) => {
    setIsAuthenticating(true)
    try {
      const authToken = await createUser(email, password)
      authenticate(authToken)
    } catch (error) {
      Alert.alert('Authentication failed!', 'Could not create user, please check your inputs!')
      setIsAuthenticating(false)
    }
  }

  return (
    <>
      {isAuthenticating ? (
        <LoadingOverlay message="Creating new user..." />
      ) : (
        <AuthContent onAuthenticate={signupHandler} />
      )}
    </>
  )
}

export default SignupScreen
