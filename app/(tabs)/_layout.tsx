import React from 'react'
import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'

const _layout = () => {
  return (
    // Hide the Page name from Stack
    <Tabs>
        <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                headerShown: false,
            }}
        />
    </Tabs>
    
  )
}

export default _layout