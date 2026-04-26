import { StyleSheet, Text, View } from 'react-native';
import { HH, HHFonts } from '../../theme/tokens';
import { HHCard } from '../ui/HHCard';
import { HHSparkbar } from '../ui/HHSparkbar';

type Props = {
  label: string;
  value: string;
  unit: string;
  delta: string;
  positive: boolean;
  data: number[];
  color: string;
};

export function TrendCard({ label, value, unit, delta, positive, data, color }: Props) {
  return (
    <HHCard padded={false} radius={22} style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <View
          style={[
            styles.delta,
            { backgroundColor: positive ? '#E6F7EE' : '#FFE9DB' },
          ]}
        >
          <Text style={[styles.deltaText, { color: positive ? '#0E8A4F' : '#B8581F' }]}>
            {delta}
          </Text>
        </View>
      </View>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      <View style={{ marginTop: 4 }}>
        <HHSparkbar data={data} width={140} height={38} color={color} />
      </View>
    </HHCard>
  );
}

const styles = StyleSheet.create({
  card: { padding: 14 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: {
    fontFamily: HHFonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: HH.inkMuted,
  },
  delta: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: HH.rPill },
  deltaText: { fontFamily: HHFonts.bodyBold, fontSize: 10 },
  valueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, marginTop: 8 },
  value: { fontFamily: HHFonts.display, fontSize: 30, color: HH.ink, lineHeight: 30 },
  unit: { fontFamily: HHFonts.body, fontSize: 12, color: HH.inkMuted, marginBottom: 4 },
});
