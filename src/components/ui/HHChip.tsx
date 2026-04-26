import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { HH, HHFonts } from '../../theme/tokens';

type Props = {
  label: string;
  emoji?: string;
  selected?: boolean;
  onPress?: () => void;
  variant?: 'surface' | 'accent' | 'dark';
  style?: StyleProp<ViewStyle>;
};

export function HHChip({ label, emoji, selected, onPress, variant = 'surface', style }: Props) {
  const palette = paletteFor(variant, !!selected);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        { backgroundColor: palette.bg, borderColor: palette.border },
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text style={[styles.label, { color: palette.fg }]}>{label}</Text>
    </Pressable>
  );
}

function paletteFor(variant: 'surface' | 'accent' | 'dark', selected: boolean) {
  if (variant === 'accent' || (variant === 'surface' && selected)) {
    return { bg: HH.accent, border: HH.accent, fg: HH.ink };
  }
  if (variant === 'dark') {
    return { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.14)', fg: '#FFFFFF' };
  }
  return { bg: HH.surface, border: HH.line, fg: HH.ink };
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: HH.rPill,
    borderWidth: 1,
    gap: 7,
  },
  emoji: { fontSize: 16 },
  label: { fontFamily: HHFonts.bodyMedium, fontSize: 13, includeFontPadding: false },
});
