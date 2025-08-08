import React, { useMemo, useState, useEffect } from 'react';
import { Slot, Tabs } from 'expo-router';
import { PaperProvider, MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppThemeProvider, useAppTheme } from '../components/theme/AppThemeProvider';
import '../i18n/setup';

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <ThemedProviders>
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#0039a6' }}>
          <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, size }) => (<Ionicons name="home" color={color} size={size} />) }} />
          <Tabs.Screen name="payments" options={{ title: 'Payments', tabBarIcon: ({ color, size }) => (<Ionicons name="card" color={color} size={size} />) }} />
          <Tabs.Screen name="chat" options={{ title: 'Support', tabBarIcon: ({ color, size }) => (<Ionicons name="chatbubbles" color={color} size={size} />) }} />
          <Tabs.Screen name="expenses" options={{ title: 'Expenses', tabBarIcon: ({ color, size }) => (<Ionicons name="pie-chart" color={color} size={size} />) }} />
          <Tabs.Screen name="services" options={{ title: 'Services', tabBarIcon: ({ color, size }) => (<Ionicons name="grid" color={color} size={size} />) }} />
          <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, size }) => (<Ionicons name="person" color={color} size={size} />) }} />
        </Tabs>
      </ThemedProviders>
    </AppThemeProvider>
  );
}

function ThemedProviders({ children }: { children: React.ReactNode }) {
  const { isDarkTheme, paperTheme } = useAppTheme();
  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        {children}
      </PaperProvider>
    </SafeAreaProvider>
  );
}