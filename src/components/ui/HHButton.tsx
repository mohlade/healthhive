import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { HH, HHFonts } from '../../theme/tokens';

export type HHButtonVariant = 'primary' | 'ghost' | 'darkGhost' | 'danger';
export type HHButtonSize = 'md' | 'lg';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: HHButtonVariant;
  size?: HHButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  uppercase?: boolean;
};

export function HHButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  style,
  fullWidth,
  uppercase,
}: Props) {
  const v = variants[variant];
  const sz = sizes[size];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        v.container,
        sz.container,
        fullWidth && styles.full,
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      {iconLeft ? <View style={styles.iconL}>{iconLeft}</View> : null}
      <Text
        style={[
          styles.label,
          v.label,
          sz.label,
          uppercase && { textTransform: 'uppercase', letterSpacing: 0.4 },
        ]}
      >
        {label}
      </Text>
      {iconRight ? <View style={styles.iconR}>{iconRight}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: HH.rPill,
  },
  full: { width: '100%' },
  label: { fontFamily: HHFonts.bodySemibold, includeFontPadding: false },
  iconL: { marginRight: 8 },
  iconR: { marginLeft: 8 },
});

const sizes: Record<HHButtonSize, { container: ViewStyle; label: { fontSize: number } }> = {
  md: { container: { paddingVertical: 11, paddingHorizontal: 14 }, label: { fontSize: 13 } },
  lg: { container: { paddingVertical: 14, paddingHorizontal: 20 }, label: { fontSize: 14 } },
};

const variants: Record<HHButtonVariant, { container: ViewStyle; label: { color: string } }> = {
  primary: {
    container: { backgroundColor: HH.accent },
    label: { color: HH.ink },
  },
  ghost: {
    container: {
      backgroundColor: 'rgba(255,255,255,0.06)',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.14)',
    },
    label: { color: '#FFFFFF' },
  },
  darkGhost: {
    container: { backgroundColor: HH.surface, borderWidth: 1, borderColor: HH.line },
    label: { color: HH.ink },
  },
  danger: {
    container: {
      backgroundColor: HH.danger,
      shadowColor: HH.danger,
      shadowOpacity: 0.45,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
    },
    label: { color: '#FFFFFF' },
  },
};
