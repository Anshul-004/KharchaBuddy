import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

const settings = () => {
  const router = useRouter();
  return (
    <View className="flex flex-1 justify-center items-center">
      <Text className="font-4xl font-bold">Welcome to Settings Page</Text>
      <Button title="Go to Profile"onPress={() => router.push("../screens/profile")}/>
    </View>
  );
};

export default settings;
