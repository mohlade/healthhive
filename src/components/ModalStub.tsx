import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { HH, HHFonts } from '../theme/tokens';
import { HHButton } from './ui/HHButton';
import { HHIcon } from './ui/HHIcon';

type Props = { title: string; subtitle: string; eyebrow?: string };

export function ModalStub({ title, subtitle, eyebrow }: Props) {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
        <Text style={styles.h}>{title}</Text>
        <Text style={styles.sub}>{subtitle}</Text>
        <View style={{ height: 24 }} />
        <HHButton
          label="Close"
          variant="darkGhost"
          onPress={() => router.back()}
          iconLeft={<HHIcon name="close" size={14} color={HH.ink} strokeWidth={2.2} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: HH.bg },
  body: { flex: 1, padding: 24, justifyContent: 'center' },
  eyebrow: {
    fontFamily: HHFonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: HH.inkMuted,
    marginBottom: 8,
  },
  h: { fontFamily: HHFonts.display, fontSize: 40, color: HH.ink, lineHeight: 44 },
  sub: { fontFamily: HHFonts.body, color: HH.inkMuted, marginTop: 8, fontSize: 14 },
});
