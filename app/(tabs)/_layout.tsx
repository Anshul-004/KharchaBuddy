import React from 'react'
import { Tabs } from 'expo-router'
import { Image, ImageBackground, Text, View } from 'react-native'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const TabIcon = ({focused, title, icon}: any) => {
    if(focused) {

        return ( 
        <View className='flex flex-row w-full flex-1 min-w-[112px] min-h-20 mt-6 justify-center items-center rounded-full overflow-hidden' >
            <Image source={icon} tintColor="#fff" className='size-5'/>
            <Text className="text-white text-base font-semibold ml-2">
                {title}
            </Text>
        </View>
        )
    }
    return(
        <View className='size-full justify-center items-center mt-4 rounded-full'>
            <Image source={icon} tintColor="#A8B5DB" className='size-5'/>
        </View>
    )
}

const _Layout = () => {
  return (
      <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: 'center',
            alignItems: 'center',
        },
        tabBarStyle: {
            backgroundColor: '#007AFF',
            borderRadius: 50,
            marginHorizontal: 10,
            marginBottom: 36,
            height: 60,
            position: 'absolute',
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#fff'
        }
      }}
      >
        <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({focused}: {focused: boolean}) => (
                    <TabIcon
                        focused= {focused}
                        icon={icons.home}
                        title="Home"
                    />
                )
            }}
        />
            <Tabs.Screen
                name="expenses"
                options={{
                    title: 'Expenses',
                    headerShown: false,
                    tabBarIcon: ({focused}: {focused: boolean}) => (
                        <TabIcon 
                            focused={focused}
                            icon={icons.money}
                            title="Expenses"
                        />
                    )
                }}
            />
        <Tabs.Screen
            name="settings"
            options={{
                title: 'Setting',
                headerShown: false,
                tabBarIcon: ({focused}: {focused: boolean}) => (
                    <TabIcon 
                        focused= {focused}
                        icon={icons.setting}
                        title="Settings"
                    />
                )
            }}
        />
        
        
      </Tabs>
    
  )
}

export default _Layout