import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

type Props = {
  size: number;
  color: string;
  /** Opacity at the center (0..1). */
  intensity?: number;
  style?: ViewStyle;
};

let glowCounter = 0;

export function RadialGlow({ size, color, intensity = 0.4, style }: Props) {
  const id = React.useMemo(() => `glow-${++glowCounter}`, []);
  return (
    <View pointerEvents="none" style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size}>
        <Defs>
          <RadialGradient id={id} cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0%" stopColor={color} stopOpacity={intensity} />
            <Stop offset="65%" stopColor={color} stopOpacity={intensity * 0.18} />
            <Stop offset="100%" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect width={size} height={size} fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}
