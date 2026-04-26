import { useEffect } from 'react';
import { TextInput, TextStyle, StyleProp } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type Props = {
  value: number;
  duration?: number;
  style?: StyleProp<TextStyle>;
  /** Number of decimal places to render. */
  decimals?: number;
};

export function HHAnimatedNumber({ value, duration = 1400, style, decimals = 0 }: Props) {
  const v = useSharedValue(0);

  useEffect(() => {
    v.value = 0;
    v.value = withTiming(value, { duration, easing: Easing.out(Easing.cubic) });
  }, [value, duration, v]);

  const animatedProps = useAnimatedProps(() => {
    const factor = Math.pow(10, decimals);
    const n = Math.round(v.value * factor) / factor;
    const text = decimals > 0 ? n.toFixed(decimals) : String(Math.round(v.value));
    return { text, defaultValue: text } as Partial<{ text: string; defaultValue: string }>;
  });

  return (
    <AnimatedTextInput
      editable={false}
      pointerEvents="none"
      defaultValue={'0'}
      animatedProps={animatedProps as never}
      style={style}
    />
  );
}
