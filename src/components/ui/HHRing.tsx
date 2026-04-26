import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  /** 0..100 */
  value: number;
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor: string;
  duration?: number;
  /** Soft halo behind the progress stroke for a glow look. */
  glow?: boolean;
  children?: React.ReactNode;
};

export function HHRing({
  value,
  size = 180,
  strokeWidth = 10,
  trackColor = 'rgba(255,255,255,0.08)',
  progressColor,
  duration = 1400,
  glow = true,
  children,
}: Props) {
  const r = size / 2 - strokeWidth - 4;
  const c = 2 * Math.PI * r;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(value, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [value, duration, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: c - (c * progress.value) / 100,
  }));

  const haloProps = useAnimatedProps(() => ({
    strokeDashoffset: c - (c * progress.value) / 100,
  }));

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {glow ? (
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={progressColor}
            strokeWidth={strokeWidth + 6}
            strokeOpacity={0.18}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            animatedProps={haloProps}
          />
        ) : null}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          animatedProps={animatedProps}
        />
      </Svg>
      <View style={styles.center} pointerEvents="none">
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  center: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
});
