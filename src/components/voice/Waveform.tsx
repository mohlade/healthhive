import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HH } from '../../theme/tokens';

const BARS = 28;
const TICK_MS = 80;

type Props = {
  active: boolean;
  height?: number;
  color?: string;
};

export function Waveform({ active, height = 36, color = HH.accent }: Props) {
  const [levels, setLevels] = useState<number[]>(() =>
    Array.from({ length: BARS }, () => 0.2),
  );
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
      setLevels(Array.from({ length: BARS }, () => 0.2));
      return;
    }
    timer.current = setInterval(() => {
      setLevels(Array.from({ length: BARS }, () => 0.2 + Math.random() * 0.8));
    }, TICK_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
    };
  }, [active]);

  return (
    <View style={[styles.row, { height }]}>
      {levels.map((l, i) => (
        <View
          key={i}
          style={{
            width: 3,
            height: `${l * 100}%`,
            backgroundColor: color,
            borderRadius: 2,
            opacity: 0.6 + l * 0.4,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 3 },
});
