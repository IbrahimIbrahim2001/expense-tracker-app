import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import "./global.css";
export default function RootLayout() {
  const queryClient = new QueryClient()
  const isAuthenticated = false
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Protected guard={isAuthenticated} >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      </QueryClientProvider>
    </PaperProvider>
  )
}