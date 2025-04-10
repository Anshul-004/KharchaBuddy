import { View, Text, Image, SafeAreaView } from 'react-native';
import React from 'react';
import { images } from '@/constants/images';
import { auth } from '@/FirebaseConfig';

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#fff]">
      <View className="w-full px-4 items-center justify-center">
        <Text className="text-3xl font-bold mb-8 text-gray-800 mt-8">Profile</Text>

        <View className="w-full bg-white rounded-3xl p-8 shadow-lg">
          <View className="items-center">
            <View className="mb-6 border-4 border-blue-500 rounded-full p-1 shadow-md">
              <Image 
                source={images.profile}
                className="w-28 h-28 rounded-full"
                resizeMode="cover"
              />
            </View>

            <View className="w-full h-[1px] bg-gray-200 my-6" />

            <View className="w-full space-y-6">
              <View className="w-full">
                <Text className="text-sm text-gray-500 mb-1">Name</Text>
                <View className="bg-gray-50 rounded-xl p-4">
                  {/* display user's name here */}
                  <Text className="text-lg font-semibold text-gray-800">Your Name</Text>
                </View>
              </View>
              
              <View className="w-full">
                <Text className="text-sm text-gray-500 mb-1">Email</Text>
                <View className="bg-gray-50 rounded-xl p-4">
                  <Text className="text-lg font-semibold text-gray-800">{auth.currentUser?.email}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
