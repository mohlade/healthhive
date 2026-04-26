import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HH, HHFonts } from '../../theme/tokens';
import { Wearable } from '../../data/mocks';
import { HHIcon } from '../ui/HHIcon';

type Props = { devices: Wearable[]; onAdd?: () => void };

export function WearableStrip({ devices, onAdd }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {devices.map((d) => (
        <View key={d.id} style={styles.tile}>
          <View style={[styles.glyph, { backgroundColor: d.color }]}>
            <Text style={styles.glyphText}>{d.glyph}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={1}>{d.name}</Text>
            <View style={styles.syncRow}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: d.live ? HH.success : HH.inkMuted },
                ]}
              />
              <Text style={styles.sync}>{d.sync}</Text>
            </View>
          </View>
        </View>
      ))}
      <Pressable onPress={onAdd} style={styles.addTile}>
        <HHIcon name="plus" size={14} color={HH.inkMuted} />
        <Text style={styles.addLabel}>Add device</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 10, paddingHorizontal: 20, paddingBottom: 4 },
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: HH.surface,
    borderRadius: HH.rMd,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: HH.line,
    minWidth: 170,
  },
  glyph: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyphText: { color: '#fff', fontSize: 14, fontFamily: HHFonts.bodyBold },
  name: { fontFamily: HHFonts.bodySemibold, fontSize: 12, color: HH.ink },
  syncRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  statusDot: { width: 5, height: 5, borderRadius: 3 },
  sync: { fontFamily: HHFonts.body, fontSize: 10, color: HH.inkMuted },
  addTile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: HH.rMd,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: HH.lineStrong,
    borderStyle: 'dashed',
  },
  addLabel: { fontFamily: HHFonts.bodyMedium, fontSize: 12, color: HH.inkMuted },
});
