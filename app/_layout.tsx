import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuthSession } from '@/lib/initialize-auth-session';
import { useAuthStore } from '@/store/auth-store';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Sentry from '@sentry/react-native';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import {
  QueryClient
} from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from "react-native-paper";
import "./global.css";

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});

export default function RootLayout() {
  const queryClient = new QueryClient({
     defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
  })

  const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
})

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
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
        <BottomSheetModalProvider>
        <Stack>
          <Stack.Protected guard={isAuthenticated} >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="transactions" options={{ headerStyle: { backgroundColor: "#162544" }, headerTintColor: "#fff", headerTitle: "Transactions", animation: "slide_from_right" }} />
            <Stack.Screen name="change-password" options={{ headerStyle: { backgroundColor: "#162544" }, headerTintColor: "#fff", headerTitle: "Change Password", animation: "slide_from_right" }} />
            <Stack.Screen name="create-budget" options={{ headerStyle: { backgroundColor: "#162544" }, headerTintColor: "#fff", headerTitle: "Create Budget", animation: "slide_from_right" }} />
            <Stack.Screen name="notifications" options={{ headerStyle: { backgroundColor: "#162544" }, headerTintColor: "#fff", headerTitle: "Notifications", animation: "slide_from_right" }} />
          </Stack.Protected>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
        </BottomSheetModalProvider>
      </PersistQueryClientProvider>
    </PaperProvider>
    </GestureHandlerRootView>
  )
}