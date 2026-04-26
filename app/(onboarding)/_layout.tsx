import { Stack } from 'expo-router';
import { HH } from '../../src/theme/tokens';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: HH.bg },
      }}
    />
  );
}
