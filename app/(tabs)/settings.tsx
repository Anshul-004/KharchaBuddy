import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

const settings = () => {
  const router = useRouter();
  return (
    <View className="flex flex-1 justify-center items-center">
      <Button title="Go to Profile"onPress={() => router.push("../screens/profile")}/>
      <Button title="Go to Appearance"onPress={() => router.push("../screens/appearance")}/>
      <Button title="Go to Data Backup"onPress={() => router.push("../screens/dataBackup")}/>
      <Button title="Go to Notification Settings"onPress={() => router.push("../screens/notifySetting")}/>
      <Button title="Go to Security"onPress={() => router.push("../screens/security")}/>
      <Button title="Go to Privacy"onPress={() => router.push("../screens/privacy")}/>
      <Button title="Go to Login"onPress={() => router.push("../screens/login")}/>
      <Button title="Go to Register"onPress={() => router.push("../screens/register")}/>
    </View>
  );
};

export default settings;
