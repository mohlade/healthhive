import { StyleSheet, Text, View } from 'react-native';
import { HH, HHFonts } from '../../theme/tokens';
import { HHIcon } from '../ui/HHIcon';

type Props = {
  badge: string;
  /** "Looks like " */
  copyLead: string;
  /** italic accent — "contact dermatitis" */
  copyAccent: string;
  copyTrail: string;
  body: string;
};

export function VerdictCard({ badge, copyLead, copyAccent, copyTrail, body }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.badgeRow}>
        <HHIcon name="sparkles" size={16} color="#B82020" strokeWidth={2.2} />
        <Text style={styles.badge}>{badge}</Text>
      </View>
      <Text style={styles.headline}>
        {copyLead}
        <Text style={styles.italic}>{copyAccent}</Text>
        {copyTrail}
      </Text>
      <Text style={styles.body}>
        {body}{' '}
        <Text style={styles.disclaimer}>Not a diagnosis</Text> — please confirm with a GP or dermatologist.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFE8E8',
    borderColor: '#F5B4B4',
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
    color: '#B82020',
  },
  headline: {
    fontFamily: HHFonts.display,
    fontSize: 24,
    lineHeight: 28,
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
  disclaimer: { fontFamily: HHFonts.bodyBold, color: HH.ink },
});
