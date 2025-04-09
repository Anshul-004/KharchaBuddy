import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { images } from '@/constants/images';

const Profile = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="w-full max-w-md self-center mt-4">
        {/* Top Title */}
        <Text className="text-2xl font-bold mb-6 text-gray-800 text-center">Profile</Text>

        <View style={styles.avatarContainer}>
          <Image 
            source={images.profile}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        {/* User Info */}
        <View className="w-full bg-gray-100 rounded-lg p-4 mb-3">
          <Text className="text-sm text-gray-500 mb-1">Name</Text>
          <Text className="text-base font-semibold text-gray-800">Your Name</Text>
        </View>

        <View className="w-full bg-gray-100 rounded-lg p-4 mb-5">
          <Text className="text-sm text-gray-500 mb-1">Email</Text>
          <Text className="text-base font-semibold text-gray-800">your@email.com</Text>
        </View>

        {/* Back Button */}
        <TouchableOpacity 
          className="w-full bg-blue-500 py-3 rounded-lg shadow-sm"
          onPress={() => router.push('/')}
        >
          <Text className="text-white text-center font-semibold">Back</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#3B82F6', 
    borderRadius: 9999,
    padding: 4,
    alignSelf: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Profile;
