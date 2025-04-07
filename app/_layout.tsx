import { Stack, useRouter } from "expo-router";
import "./globals.css";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");

      if (hasOnboarded) {
        router.replace("/(tabs)"); // for dev only later will remove it
        // router.replace("/screens/login"); // After completing onboarding, redirect to login
      } else {
        router.replace("/onboarding"); // Show onboarding
      }
    };

    checkOnboarding();
  }, []);

  return (
    <Stack initialRouteName="onboarding">
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="expenses/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="screens/profile" options={{ headerShown: true, headerTitle: "User Profile"}}  />
      <Stack.Screen name="screens/appearance" options={{ headerShown: true, headerTitle: "Appearance"}}  />
      <Stack.Screen name="screens/dataBackup" options={{ headerShown: true, headerTitle: "Data Backup"}}  />
      <Stack.Screen name="screens/notifySetting" options={{ headerShown: true, headerTitle: "Notification Setting"}}  />
      <Stack.Screen name="screens/security" options={{ headerShown: true, headerTitle: "Security"}}  />
      <Stack.Screen name="screens/privacy" options={{ headerShown: true, headerTitle: "Privacy Policy"}}  />
      <Stack.Screen name="screens/login" options={{ headerShown: false}}  />
      <Stack.Screen name="screens/register" options={{ headerShown: false}}  />
    </Stack>
  );
}