// Temporarily created to preview the invoice image, later be deleted

import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useLocalSearchParams } from 'expo-router';

const PreviewInvoice = () => {
  const navigation = useNavigation();
  const { imageUri } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center justify-center">
      <Text className="text-xl font-bold mb-5">Preview Invoice</Text>
      <Image
        source={{ uri: Array.isArray(imageUri) ? imageUri[0] : imageUri }}
        className="w-80 h-96 rounded-lg mb-5"
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-blue-600 px-4 py-3 rounded-lg"
      >
        <Text className="text-white font-bold">Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PreviewInvoice;
