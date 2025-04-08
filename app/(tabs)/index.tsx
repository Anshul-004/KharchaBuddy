import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { auth } from '@/FirebaseConfig'

const Index = () => {
  const handleSignOut = async () => {
    try {
  
      await auth.signOut(); 
      console.log('User signed out successfully');
      
    } catch (error:any) {
      console.log('Error signing out:', error.message);
    }
  };

  //known prob - > Page doesn't reload after singing out, but works well.
  return (
    <View className='flex flex-1 justify-center items-center'>
      <Text className='font-4xl font-bold'>Welcome, {auth.currentUser?.email}</Text>
      <TouchableOpacity className='w-[40%] bg-blue-500 py-3 rounded-lg my-4' onPress={handleSignOut}>
        <Text className='color-white text-center'>Sign Out</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Index