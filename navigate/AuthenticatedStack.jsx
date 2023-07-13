import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext } from 'react'
import WelcomeScreen from '../screens/WelcomeScreen'
import { Colors } from '../constants/styles'
import IconButton from '../components/ui/IconButton'
import { AuthContext } from '../store/context'

const Stack = createNativeStackNavigator()

const AuthenticatedStack = () => {
  const authCtx = useContext(AuthContext)
  const { logout } = authCtx
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
        headerRight: ({ tintColor }) => <IconButton icon="exit" size={24} color={tintColor} onPress={logout} />,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  )
}

export default AuthenticatedStack
