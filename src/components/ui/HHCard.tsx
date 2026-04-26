import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { HH } from '../../theme/tokens';

type Props = ViewProps & {
  variant?: 'surface' | 'dark' | 'alt';
  radius?: number;
  padded?: boolean;
};

export function HHCard({ children, style, variant = 'surface', radius = HH.rLg, padded = true, ...rest }: Props) {
  return (
    <View
      {...rest}
      style={[
        styles.base,
        variant === 'surface' && styles.surface,
        variant === 'dark' && styles.dark,
        variant === 'alt' && styles.alt,
        { borderRadius: radius },
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {},
  padded: { padding: HH.s4 },
  surface: { backgroundColor: HH.surface, borderWidth: 1, borderColor: HH.line },
  alt:     { backgroundColor: HH.surfaceAlt, borderWidth: 1, borderColor: HH.line },
  dark:    { backgroundColor: HH.ink },
});
