import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HH, HHFonts } from '../../theme/tokens';
import { HHIcon, HHIconName } from '../ui/HHIcon';

type Props = {
  icon: HHIconName;
  title: string;
  sub: string;
  cta: string;
  onPress?: () => void;
};

export function SuggestedNextRow({ icon, title, sub, cta, onPress }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.iconTile}>
        <HHIcon name={icon} size={18} color={HH.ink} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>
      <Pressable onPress={onPress} style={({ pressed }) => [styles.cta, pressed && { opacity: 0.85 }]}>
        <Text style={styles.ctaLabel}>{cta}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: HH.surface,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: HH.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconTile: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: HH.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontFamily: HHFonts.bodySemibold, fontSize: 13, color: HH.ink },
  sub: { fontFamily: HHFonts.body, fontSize: 11, color: HH.inkMuted, marginTop: 2 },
  cta: {
    backgroundColor: HH.ink,
    borderRadius: HH.rPill,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  ctaLabel: { fontFamily: HHFonts.bodyBold, fontSize: 12, color: HH.accent },
});
