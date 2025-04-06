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
        router.replace("/(tabs)"); // Main app screen
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
    </Stack>
  );
}