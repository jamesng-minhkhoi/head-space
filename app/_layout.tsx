// Root Layout - Navigation Configuration for Calm Transitions
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Regular weights
    'HankenGrotesk-ExtraLight': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-ExtraLight.ttf'),
    'HankenGrotesk-Light': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-Light.ttf'),
    'HankenGrotesk-Regular': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-Regular.ttf'),
    'HankenGrotesk-Medium': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-Medium.ttf'),
    'HankenGrotesk-SemiBold': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-SemiBold.ttf'),
    'HankenGrotesk-Bold': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-Bold.ttf'),
    'HankenGrotesk-ExtraBold': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-ExtraBold.ttf'),
    'HankenGrotesk-Black': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-Black.ttf'),
    // Italic weights
    'HankenGrotesk-ExtraLightItalic': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-ExtraLightItalic.ttf'),
    'HankenGrotesk-LightItalic': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-LightItalic.ttf'),
    'HankenGrotesk-Italic': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-Italic.ttf'),
    'HankenGrotesk-MediumItalic': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-MediumItalic.ttf'),
    'HankenGrotesk-SemiBoldItalic': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-SemiBoldItalic.ttf'),
    'HankenGrotesk-BoldItalic': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-BoldItalic.ttf'),
    'HankenGrotesk-ExtraBoldItalic': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-ExtraBoldItalic.ttf'),
    'HankenGrotesk-BlackItalic': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-BlackItalic.ttf'),
    'HankenGrotesk-Thin': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-Thin.ttf'),
    'HankenGrotesk-ThinItalic': require('../assets/fonts/Hanken_Grotesk/static/HankenGrotesk-ThinItalic.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 400,
          gestureEnabled: true,
        }}
      >
        {/* Welcome Screen - Main entry point */}
        <Stack.Screen name="index" />

        {/* Paywall Screen - Full screen card presentation */}
        <Stack.Screen
          name="paywall"
          options={{
            presentation: 'card',
            animation: 'slide_from_bottom',
            gestureEnabled: true,
          }}
        />

        {/* Hide default tabs folder from navigation */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
