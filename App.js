import { useState, useCallback, useEffect, useContext } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import * as SecureStore from 'expo-secure-store'
import Navigation from './navigate/Navigation'
import AuthContextProvider from './store/context'
import { AuthContext } from './store/context'

SplashScreen.preventAutoHideAsync()

const Root = () => {
  const authCtx = useContext(AuthContext)
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await SecureStore.getItemAsync('token')

      if (storedToken) {
        authCtx.authenticate(storedToken)
      }

      setAppIsReady(true)
    }
    fetchToken()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Navigation />
    </View>
  )
}

const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  )
}

export default App
