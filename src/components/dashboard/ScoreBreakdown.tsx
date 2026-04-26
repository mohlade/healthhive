import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HH, HHFonts } from '../../theme/tokens';
import { ScoreFactor } from '../../data/mocks';

type Props = { factors: ScoreFactor[]; accent?: string };

export function ScoreBreakdown({ factors, accent = HH.accent }: Props) {
  return (
    <View style={{ gap: 12 }}>
      {factors.map((f) => (
        <View key={f.label} style={styles.row}>
          <Text style={styles.label}>{f.label}</Text>
          <View style={styles.track}>
            <LinearGradient
              colors={[`${accent}80`, accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.fill, { width: `${f.value}%` }]}
            />
          </View>
          <Text style={styles.value}>{f.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  label: {
    width: 76,
    fontFamily: HHFonts.bodyMedium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
  },
  track: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 6 },
  value: {
    width: 30,
    textAlign: 'right',
    fontFamily: HHFonts.display,
    fontSize: 14,
    color: '#fff',
  },
});
