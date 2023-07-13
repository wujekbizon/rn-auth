import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../store/context'

function WelcomeScreen() {
  const authCtx = useContext(AuthContext)
  const { token } = authCtx
  const [fetchedMessage, setFetchedMessage] = useState('')
  useEffect(() => {
    const fetchMessage = async () => {
      const response = await axios.get(
        `https://react-native-course-446c9-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      setFetchedMessage(response.data)
    }

    fetchMessage()
  }, [token])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
})
