import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { auth } from "@/FirebaseConfig"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingItemProps {
  title: string;
  icon: string;
  route?: string;
  onPress?: () => void;
}

const Settings = () => {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async() => {
           try {
                 await auth.signOut(); 
                 await AsyncStorage.removeItem('hasOnboarded');
                 console.log('Onboarding reset successfully');
                 console.log('User signed out successfully');
                 router.push('/onboarding'); // Redirect to the oboarding page after signing out
                 
               } catch (error:any) {
                 console.log('Error signing out:', error.message);
               }
          }
        }
      ]
    );
  };


  
  const SettingItem = ({ title, icon, route, onPress }: SettingItemProps) => (
    <TouchableOpacity 
      className="flex-row items-center w-full p-4 mb-2 bg-white rounded-xl shadow-sm"
      onPress={onPress ? onPress : route ? () => router.push(route as any) : undefined}
    >
      <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
        <Ionicons name={icon as any} size={24} color="#4B5563" />
      </View>
      <Text className="flex-1 ml-4 text-gray-700 text-lg font-medium">
        {title}
      </Text>
      <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4 pt-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6 px-2">Settings</Text>
        
        <View className="space-y-4">
          <SettingItem 
            title="Profile" 
            icon="person-outline" 
            route="/screens/profile"
          />
          <SettingItem 
            title="Notifications" 
            icon="notifications-outline" 
            route="/screens/notifySetting"
          />
          <SettingItem 
            title="About" 
            icon="help-outline" 
            route="/screens/about"
          />
          <SettingItem 
            title="Privacy" 
            icon="lock-closed-outline" 
            route="/screens/privacy"
          />
          <SettingItem 
            title="Logout" 
            icon="log-out-outline" 
            onPress={handleLogout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;