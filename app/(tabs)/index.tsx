import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { auth } from '@/FirebaseConfig'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import LoadingIndicator from '../components/LoadingIndicator'

const Index = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  // Check if the user is logged in and navigate accordingly
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User is Logged In:', user.email);
        navigation.replace('/(tabs)', { email: user.email })
      }else {
        navigation.replace('/screens/login');
      }
      setLoading(false);
    })

    return unsubscribe
  }, [])
  

  if (loading) {
    return <LoadingIndicator />;
    
  }

  //known prob - > Page doesn't reload after singing out, but works well.
  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text className='font-4xl font-bold'>Welcome, {auth.currentUser?.email}</Text>
    </View>
  )
}

export default Index