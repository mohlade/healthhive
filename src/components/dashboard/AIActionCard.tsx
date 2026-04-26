import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HH, HHFonts } from '../../theme/tokens';
import { HHIcon, HHIconName } from '../ui/HHIcon';

type Props = {
  icon: HHIconName;
  label: string;
  hint: string;
  color: string;
  onPress?: () => void;
};

export function AIActionCard({ icon, label, hint, color, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <View style={[styles.iconTile, { backgroundColor: color }]}>
        <HHIcon name={icon} size={20} color={HH.ink} strokeWidth={1.8} />
      </View>
      <View style={{ marginTop: 'auto' }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 120,
    backgroundColor: HH.surface,
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: HH.line,
    justifyContent: 'space-between',
  },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: HHFonts.bodySemibold,
    fontSize: 13,
    color: HH.ink,
    lineHeight: 16,
  },
  hint: {
    fontFamily: HHFonts.body,
    fontSize: 11,
    color: HH.inkMuted,
    marginTop: 3,
  },
});
