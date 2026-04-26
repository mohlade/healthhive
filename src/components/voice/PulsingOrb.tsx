import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { HH } from '../../theme/tokens';
import { HHIcon } from '../ui/HHIcon';
import { RadialGlow } from '../dashboard/RadialGlow';

type Phase = 'ready' | 'listening' | 'analyzing' | 'result';

type Props = {
  phase: Phase;
  onPress: () => void;
  size?: number;
  accent?: string;
};

export function PulsingOrb({ phase, onPress, size = 220, accent = HH.accent }: Props) {
  const pulsing = phase === 'listening' || phase === 'analyzing';
  const breathing = phase === 'listening';

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Ring phase={pulsing} delayMs={0}    accent={accent} />
      <Ring phase={pulsing} delayMs={800}  accent={accent} />
      <Ring phase={pulsing} delayMs={1600} accent={accent} />

      <BreathingGlow active={breathing} accent={accent} />

      <Pressable onPress={onPress} style={[styles.button, { backgroundColor: phase === 'listening' ? '#fff' : accent }]}>
        <HHIcon
          name={phase === 'listening' ? 'pause' : 'mic'}
          size={44}
          color={HH.ink}
          strokeWidth={2}
        />
      </Pressable>
    </View>
  );
}

function Ring({ phase, delayMs, accent }: { phase: boolean; delayMs: number; accent: string }) {
  const t = useSharedValue(0);

  useEffect(() => {
    if (phase) {
      t.value = withDelay(
        delayMs,
        withRepeat(
          withTiming(1, { duration: 2400, easing: Easing.out(Easing.cubic) }),
          -1,
          false,
        ),
      );
    } else {
      cancelAnimation(t);
      t.value = 0;
    }
    return () => cancelAnimation(t);
  }, [phase, delayMs, t]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(t.value, [0, 1], [0.85, 1.6]) }],
    opacity: interpolate(t.value, [0, 0.3, 1], [0, 0.7, 0], 'clamp'),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        styles.ring,
        { borderColor: accent },
        style,
      ]}
    />
  );
}

function BreathingGlow({ active, accent }: { active: boolean; accent: string }) {
  const t = useSharedValue(0);

  useEffect(() => {
    if (active) {
      t.value = withRepeat(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
    } else {
      cancelAnimation(t);
      t.value = 0;
    }
    return () => cancelAnimation(t);
  }, [active, t]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(t.value, [0, 1], [1, 1.08]) }],
  }));

  return (
    <Animated.View pointerEvents="none" style={[styles.glow, style]}>
      <RadialGlow size={160} color={accent} intensity={0.9} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  ring: { borderWidth: 2, borderRadius: 999 },
  glow: {
    position: 'absolute',
    top: 30, left: 30, right: 30, bottom: 30,
    borderRadius: 999,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    top: 55, left: 55, right: 55, bottom: 55,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: HH.accent,
    shadowOpacity: 0.55,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
});
