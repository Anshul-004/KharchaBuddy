import { Stack } from "expo-router";
import "./globals.css"

export default function RootLayout() {
  return(
    <Stack>
      {/* Hide the grouping of tabs from Stack */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
    </Stack>
  )
    
}