import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HH, HHFonts } from '../../src/theme/tokens';

export default function Welcome() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.center}>
        <Text style={styles.title}>
          Welcome to <Text style={styles.italic}>HealthHive</Text>.
        </Text>
        <Text style={styles.subtitle}>Onboarding flow — placeholder.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: HH.bg },
  center: { flex: 1, paddingHorizontal: 24, alignItems: 'flex-start', justifyContent: 'center' },
  title: { fontFamily: HHFonts.display, fontSize: 44, color: HH.ink, lineHeight: 48 },
  italic: { fontFamily: HHFonts.displayItalic },
  subtitle: { fontFamily: HHFonts.body, color: HH.inkMuted, marginTop: 8, fontSize: 14 },
});
