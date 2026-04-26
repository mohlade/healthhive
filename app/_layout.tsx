import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  InstrumentSerif_400Regular,
  InstrumentSerif_400Regular_Italic,
  useFonts as useInstrument,
} from '@expo-google-fonts/instrument-serif';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts as useInter,
} from '@expo-google-fonts/inter';
import {
  JetBrainsMono_400Regular,
  useFonts as useJetBrains,
} from '@expo-google-fonts/jetbrains-mono';

import { HH } from '../src/theme/tokens';

export default function RootLayout() {
  const [serifReady] = useInstrument({
    InstrumentSerif_400Regular,
    InstrumentSerif_400Regular_Italic,
  });
  const [interReady] = useInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [monoReady] = useJetBrains({ JetBrainsMono_400Regular });

  const ready = serifReady && interReady && monoReady;

  if (!ready) return <View style={{ flex: 1, backgroundColor: HH.bg }} />;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: HH.bg }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: HH.bg },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="voice"    options={{ presentation: 'modal' }} />
          <Stack.Screen name="camera"   options={{ presentation: 'modal' }} />
          <Stack.Screen name="rx"       options={{ presentation: 'modal' }} />
          <Stack.Screen name="insights" options={{ presentation: 'modal' }} />
          <Stack.Screen name="consult"  options={{ presentation: 'modal' }} />
          <Stack.Screen name="ride"     options={{ presentation: 'modal' }} />
          <Stack.Screen name="sos"      options={{ presentation: 'modal' }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
