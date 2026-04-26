import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HH, HHFonts } from '../../src/theme/tokens';

export default function Records() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        <Text style={styles.h}>Medical <Text style={styles.i}>records</Text></Text>
        <Text style={styles.sub}>Coming next.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: HH.bg },
  body: { flex: 1, padding: 24, justifyContent: 'center' },
  h: { fontFamily: HHFonts.display, fontSize: 44, color: HH.ink, lineHeight: 48 },
  i: { fontFamily: HHFonts.displayItalic },
  sub: { fontFamily: HHFonts.body, color: HH.inkMuted, marginTop: 8 },
});
