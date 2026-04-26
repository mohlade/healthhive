import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HH, HHFonts } from '../../src/theme/tokens';
import { HHIcon, HHIconName } from '../../src/components/ui/HHIcon';

const TABS: { name: 'index' | 'symptoms' | 'meds' | 'records'; label: string; icon: HHIconName }[] = [
  { name: 'index',    label: 'Home',     icon: 'home' },
  { name: 'symptoms', label: 'Symptoms', icon: 'heart' },
  { name: 'meds',     label: 'Meds',     icon: 'pill' },
  { name: 'records',  label: 'Records',  icon: 'folder' },
];

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: HH.bg } }}
      tabBar={({ state, navigation }) => (
        <View
          style={[
            styles.bar,
            { bottom: Math.max(insets.bottom, 12), marginHorizontal: 16 },
          ]}
        >
          {state.routes.map((route, idx) => {
            const def = TABS.find((t) => t.name === (route.name as typeof TABS[number]['name']));
            if (!def) return null;
            const focused = state.index === idx;
            return (
              <Pressable
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                style={[styles.item, focused && styles.itemFocused]}
              >
                <HHIcon
                  name={def.icon}
                  size={20}
                  color={focused ? HH.ink : HH.inkMuted}
                  strokeWidth={focused ? 2 : 1.7}
                />
                <Text style={[styles.label, focused && styles.labelFocused]}>{def.label}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="symptoms" />
      <Tabs.Screen name="meds" />
      <Tabs.Screen name="records" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: HH.surface,
    borderRadius: HH.rPill,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: HH.line,
    shadowColor: HH.ink,
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  item: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: HH.rPill,
    gap: 6,
  },
  itemFocused: { backgroundColor: HH.surfaceAlt },
  label: { fontFamily: HHFonts.bodyMedium, fontSize: 12, color: HH.inkMuted },
  labelFocused: { color: HH.ink, fontFamily: HHFonts.bodySemibold },
});
