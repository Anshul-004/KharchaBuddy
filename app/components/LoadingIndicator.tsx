// LoadingIndicator.tsx

import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingIndicator = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" className="text-blue-500" /> 
    </View>
  );
};

export default LoadingIndicator;
