import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HH, HHFonts } from '../../theme/tokens';
import { HHButton } from '../ui/HHButton';
import { HHIcon } from '../ui/HHIcon';
import { RadialGlow } from './RadialGlow';

type Props = {
  badge: string;
  copyLead: string;
  copyAccent: string;
  copyTrail: string;
  body: string;
  onAskAI: () => void;
  onBookConsult: () => void;
};

export function AIInsightCard({
  badge,
  copyLead,
  copyAccent,
  copyTrail,
  body,
  onAskAI,
  onBookConsult,
}: Props) {
  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={['#0D1414', '#1a2626']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <RadialGlow
        size={140}
        color={HH.accent}
        intensity={0.35}
        style={{ position: 'absolute', top: -40, right: -40 }}
      />

      <View style={styles.badgeRow}>
        <View style={styles.badgeDot}>
          <HHIcon name="sparkles" size={14} color={HH.ink} strokeWidth={2.2} />
        </View>
        <Text style={styles.badgeLabel}>{badge}</Text>
      </View>

      <Text style={styles.headline}>
        {copyLead} <Text style={styles.headlineAccent}>{copyAccent}</Text> {copyTrail}
      </Text>

      <Text style={styles.body}>{body}</Text>

      <View style={styles.actions}>
        <HHButton
          label="Talk to Hive"
          variant="primary"
          fullWidth
          onPress={onAskAI}
          iconLeft={<HHIcon name="mic" size={14} color={HH.ink} strokeWidth={2.2} />}
          style={{ flex: 1 }}
        />
        <HHButton label="Book consult" variant="ghost" onPress={onBookConsult} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: HH.rLg,
    padding: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(215,255,58,0.18)',
  },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badgeDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: HH.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontFamily: HHFonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: HH.accent,
  },
  headline: {
    fontFamily: HHFonts.display,
    fontSize: 24,
    lineHeight: 30,
    color: '#fff',
    marginTop: 10,
    letterSpacing: -0.3,
  },
  headlineAccent: {
    fontFamily: HHFonts.displayItalic,
    color: HH.accent,
  },
  body: {
    fontFamily: HHFonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 10,
  },
  actions: { flexDirection: 'row', gap: 8, marginTop: 14 },
});
