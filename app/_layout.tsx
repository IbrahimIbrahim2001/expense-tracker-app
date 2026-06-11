import { initializeAuthSession } from '@/lib/initialize-auth-session';
import { useAuthStore } from '@/store/auth-store';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from 'react';
import { PaperProvider } from "react-native-paper";
import "./global.css";
export default function RootLayout() {
  const queryClient = new QueryClient()

  SplashScreen.preventAutoHideAsync();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hydrated = useAuthStore((s) => s.hydrated);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeAuthSession();
      } finally {
        setReady(true);
        await SplashScreen.hideAsync();
      }
    };

    init();
  }, []);

  if (!ready || !hydrated) {
    return null;
  }

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