import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HH } from '../../theme/tokens';

type Props = {
  /** Intensity 0..1 */
  intensity: number;
  size?: number;
  radius?: number;
  /** Override the default 4-stop ramp. */
  ramp?: [string, string, string, string];
};

const DEFAULT_RAMP: [string, string, string, string] = [
  HH.surfaceAlt,
  '#FFE0CC',
  '#FF9B5E',
  HH.danger,
];

export function HHHeatmapCell({ intensity, size = 18, radius = 4, ramp = DEFAULT_RAMP }: Props) {
  const v = clamp01(intensity);
  const color =
    v < 0.01 ? ramp[0] :
    v < 0.34 ? ramp[1] :
    v < 0.67 ? ramp[2] :
               ramp[3];
  return (
    <View
      style={[
        styles.cell,
        { width: size, height: size, borderRadius: radius, backgroundColor: color },
      ]}
    />
  );
}

function clamp01(n: number) {
  if (Number.isNaN(n)) return 0;
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

const styles = StyleSheet.create({
  cell: {},
});
