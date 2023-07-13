import { useContext } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import AuthenticatedStack from './AuthenticatedStack'
import { AuthContext } from '../store/context'

const Navigation = () => {
  const authCtx = useContext(AuthContext)
  const { isAuthenticated } = authCtx

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  )
}
export default Navigation
