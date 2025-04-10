import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { images } from '@/constants/images';

const About = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1" contentContainerStyle={{ alignItems: 'center' }}>
        <View className="w-full items-center p-5 bg-white">
          <Image 
            source={images.logo}
            className="w-24 h-24 rounded-2xl"
          />
          <Text className="text-2xl font-bold mt-2.5 text-gray-800">KharchaBuddy</Text>
          <Text className="text-base text-gray-500 mt-1">Version 1.0.0</Text>
        </View>

        <View className="bg-white mx-2.5 my-2 p-4 rounded-lg w-[95%]">
          <Text className="text-lg font-bold text-gray-800 mb-2.5">About KharchaBuddy</Text>
          <Text className="text-base text-gray-700 leading-6">
            KharchaBuddy is your personal expense tracking companion. Easily manage
            your daily expenses, create budgets, and track your spending habits all
            in one place.
          </Text>
        </View>

        <View className="bg-white mx-2.5 my-2 p-4 rounded-lg w-[95%]">
          <Text className="text-lg font-bold text-gray-800 mb-2.5">Features</Text>
          <View className="mt-1">
            <Text className="text-base text-gray-700 mb-2">• Expense Tracking</Text>
            <Text className="text-base text-gray-700 mb-2">• Budget Management</Text>
            <Text className="text-base text-gray-700 mb-2">• Spending Analytics</Text>
            <Text className="text-base text-gray-700 mb-2">• Category-wise Reports</Text>
          </View>
        </View>

        <View className="p-5 items-center">
          <Text className="text-sm text-gray-500">© 2023 KharchaBuddy</Text>
          <Text className="text-sm text-gray-500">All rights reserved</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
