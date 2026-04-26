import { StyleSheet, Text, View } from 'react-native';
import { HH, HHFonts } from '../../theme/tokens';

export type DiffEntry = { label: string; confidence: number };

type Props = { entries: DiffEntry[] };

export function Differential({ entries }: Props) {
  return (
    <View style={styles.list}>
      {entries.map((e, i) => (
        <View
          key={e.label}
          style={[
            styles.row,
            i < entries.length - 1 && styles.rowDivider,
          ]}
        >
          <Text style={styles.label} numberOfLines={1}>{e.label}</Text>
          <View style={styles.bar}>
            <View style={[styles.barFill, { width: `${Math.min(100, Math.max(0, e.confidence))}%` }]} />
          </View>
          <Text style={styles.percent}>{e.confidence}%</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: HH.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: HH.line,
    overflow: 'hidden',
  },
  row: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: HH.line },
  label: { flex: 1, fontFamily: HHFonts.bodyMedium, fontSize: 13, color: HH.ink },
  bar: {
    width: 80,
    height: 4,
    backgroundColor: HH.line,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: { height: '100%', backgroundColor: HH.ink },
  percent: {
    width: 36,
    textAlign: 'right',
    fontFamily: HHFonts.mono,
    fontSize: 12,
    color: HH.inkMuted,
  },
});
