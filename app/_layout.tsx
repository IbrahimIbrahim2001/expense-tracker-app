import { initializeAuthSession } from '@/lib/initialize-auth-session';
import { useAuthStore } from '@/store/auth-store';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
    <GestureHandlerRootView className="flex-1">
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <BottomSheetModalProvider>
        <Stack>
          <Stack.Protected guard={isAuthenticated} >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="transactions" options={{ headerStyle: { backgroundColor: "#162544" }, headerTintColor: "#fff", headerTitle: "Transactions", animation: "slide_from_right" }} />
            <Stack.Screen name="change-password" options={{ headerStyle: { backgroundColor: "#162544" }, headerTintColor: "#fff", headerTitle: "Change Password", animation: "slide_from_right" }} />
          </Stack.Protected>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
        </BottomSheetModalProvider>
      </QueryClientProvider>
    </PaperProvider>
    </GestureHandlerRootView>
  )
}