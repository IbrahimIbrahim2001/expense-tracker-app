import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Stack } from "expo-router";
import "./global.css";

export default function RootLayout() {
  const queryClient = new QueryClient()
  const isAuthenticated = false
  return (
    <>
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
    </>
  )
}