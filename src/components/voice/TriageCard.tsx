import { StyleSheet, Text, View } from 'react-native';
import { HH, HHFonts } from '../../theme/tokens';
import { HHIcon } from '../ui/HHIcon';

type Props = {
  badge: string;
  /** "Could be a " */
  copyLead: string;
  /** italic accent — "tension migraine" */
  copyAccent: string;
  /** trailing text after italic */
  copyTrail: string;
  body: string;
};

export function TriageCard({ badge, copyLead, copyAccent, copyTrail, body }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.badgeRow}>
        <HHIcon name="sparkles" size={16} color="#B8581F" strokeWidth={2.2} />
        <Text style={styles.badge}>{badge}</Text>
      </View>
      <Text style={styles.headline}>
        {copyLead}
        <Text style={styles.italic}>{copyAccent}</Text>
        {copyTrail}
      </Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF4E0',
    borderColor: '#F5D99A',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
  },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: {
    fontFamily: HHFonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#B8581F',
  },
  headline: {
    fontFamily: HHFonts.display,
    fontSize: 22,
    lineHeight: 26,
    color: HH.ink,
    marginTop: 8,
    letterSpacing: -0.3,
  },
  italic: { fontFamily: HHFonts.displayItalic },
  body: {
    fontFamily: HHFonts.body,
    fontSize: 12,
    color: HH.inkSoft,
    marginTop: 8,
    lineHeight: 18,
  },
});
