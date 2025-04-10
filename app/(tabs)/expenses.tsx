import { View, Text } from 'react-native'
import React, {useState} from 'react'
import LoadingIndicator from '../components/LoadingIndicator'


const expenses = () => {
    const [loading, setLoading] = useState(true);
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
      return <LoadingIndicator />;
    }
  return (
    <View className='flex flex-1 justify-center items-center'>
        <Text className='font-4xl font-bold'>Welcome to Expenses Page</Text>
    </View>
  )
}

export default expenses