import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { useRouter } from 'expo-router';

const Privacy = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-10">
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <Text className="text-3xl font-bold text-gray-800 mb-4 text-center">Privacy Policy</Text>

        <Text className="text-gray-700 mb-4">
          We value your privacy. This policy explains how we collect, use, and protect your personal information.
        </Text>

        <Text className="text-lg font-semibold text-gray-800 mb-2">1. Information We Collect</Text>
        <Text className="text-gray-700 mb-4">
          We may collect your name, email address, and usage data to improve your experience.
        </Text>

        <Text className="text-lg font-semibold text-gray-800 mb-2">2. How We Use Your Information</Text>
        <Text className="text-gray-700 mb-4">
          Your information is used solely to provide and improve the services of KharchaBuddy. We never sell or share it with third parties.
        </Text>

        <Text className="text-lg font-semibold text-gray-800 mb-2">3. Security</Text>
        <Text className="text-gray-700 mb-4">
          We implement strong security measures to protect your data. However, no method is 100% secure.
        </Text>

        <Text className="text-lg font-semibold text-gray-800 mb-2">4. Changes to This Policy</Text>
        <Text className="text-gray-700 mb-4">
          We may update this policy occasionally. Any changes will be reflected on this page.
        </Text>

        <Text className="text-lg font-semibold text-gray-800 mb-2">5. Contact Us</Text>
        <Text className="text-gray-700 mb-6">
          If you have any questions about this Privacy Policy, contact us at support@kharchabuddy.com.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Privacy;
