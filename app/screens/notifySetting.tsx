import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';

const NotifySetting = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setIsEnabled(status === 'granted');
  };

  const toggleNotifications = async () => {
    if (!isEnabled) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        setIsEnabled(true);
        Alert.alert('Success', 'Notifications enabled successfully!');
      } else {
        Alert.alert(
          'Permission Required',
          'Please enable notifications in your device settings to receive updates.'
        );
      }
    } else {
      Alert.alert(
        'Disable Notifications',
        'Do you want to disable notifications?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Open Settings', 
            onPress: () => {
              Linking.openSettings();
            }
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-5">
        <Text className="text-2xl font-bold mb-5">Notification Settings</Text>
        <View className="flex-row justify-between items-center py-4 border-b border-gray-200">
          <Text className="text-base">Enable Notifications</Text>
          <Switch
            value={isEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>
        <Text className="mt-2.5 text-sm text-gray-600">
          Enable notifications to receive updates about your expenses and budgets.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default NotifySetting;
