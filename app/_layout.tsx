import { Stack, useRouter } from "expo-router";
import "./globals.css";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Check condition here if user is new or already onboarded (localstorage / asyncstorage)
    router.replace("/onboarding");
  }, []);

  return (
    <Stack initialRouteName="onboarding">
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="expenses/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
