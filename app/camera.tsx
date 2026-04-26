import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HH, HHFonts } from '../src/theme/tokens';
import { HHIcon } from '../src/components/ui/HHIcon';
import { HHButton } from '../src/components/ui/HHButton';
import { Viewfinder } from '../src/components/camera/Viewfinder';
import { VerdictCard } from '../src/components/camera/VerdictCard';
import { Differential, DiffEntry } from '../src/components/camera/Differential';

type Phase = 'capture' | 'analyzing' | 'result';

const DIFFS: DiffEntry[] = [
  { label: 'Eczema flare-up',     confidence: 34 },
  { label: 'Heat rash (miliaria)', confidence: 18 },
  { label: 'Early cellulitis',     confidence: 9 },
];

export default function Camera() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('capture');

  useEffect(() => {
    if (phase !== 'analyzing') return;
    const t = setTimeout(() => setPhase('result'), 2200);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <Header
          phase={phase}
          onClose={() => router.back()}
        />

        {phase !== 'result' ? (
          <>
            <Viewfinder phase={phase} />
            <ShutterRow
              busy={phase === 'analyzing'}
              onCapture={() => setPhase('analyzing')}
            />
          </>
        ) : (
          <ResultView
            onClose={() => router.back()}
            onConsult={() => router.replace('/consult')}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

function Header({ phase, onClose }: { phase: Phase; onClose: () => void }) {
  const status =
    phase === 'capture' ? 'Skin, rash, eye, wound'
    : phase === 'analyzing' ? 'Analyzing image…'
    : 'Preliminary analysis';

  return (
    <View style={styles.header}>
      <Pressable onPress={onClose} style={styles.iconBtn}>
        <HHIcon name="close" size={18} color="#fff" />
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text style={styles.eyebrow}>Hive AI · Visual scan</Text>
        <Text style={styles.statusText}>{status}</Text>
      </View>
      {phase !== 'result' ? (
        <Pressable style={styles.iconBtn}>
          <HHIcon name="flash" size={18} color="#fff" />
        </Pressable>
      ) : null}
    </View>
  );
}

function ShutterRow({ busy, onCapture }: { busy: boolean; onCapture: () => void }) {
  return (
    <View style={styles.shutterRow}>
      <Pressable style={styles.smallBtn}>
        <HHIcon name="folder" size={18} color="#fff" />
      </Pressable>
      <Pressable
        onPress={busy ? undefined : onCapture}
        style={({ pressed }) => [
          styles.shutter,
          pressed && !busy && { opacity: 0.85 },
          busy && { opacity: 0.7 },
        ]}
      />
      <Pressable style={styles.smallBtn}>
        <HHIcon name="rotate" size={18} color="#fff" />
      </Pressable>
    </View>
  );
}

function ResultView({
  onClose,
  onConsult,
}: {
  onClose: () => void;
  onConsult: () => void;
}) {
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, paddingTop: 4 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.photo}>
        <LinearGradient
          colors={['#8a5a42', '#c08860', '#d8a070']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.photoStamp}>
          <Text style={styles.photoStampText}>Scan · Apr 19, 14:32</Text>
        </View>
      </View>

      <View style={{ marginTop: 12 }}>
        <VerdictCard
          badge="Hive AI · Possible match · 78% confidence"
          copyLead="Looks like "
          copyAccent="contact dermatitis"
          copyTrail="."
          body="Redness, slight swelling, no pus — consistent with an allergic skin reaction."
        />
      </View>

      <View style={{ marginTop: 14 }}>
        <Text style={styles.sectionLabel}>Also considered</Text>
        <Differential entries={DIFFS} />
      </View>

      <View style={styles.resultActions}>
        <HHButton label="Save scan" variant="darkGhost" style={{ flex: 1 }} onPress={onClose} />
        <View style={{ width: 8 }} />
        <Pressable style={styles.primaryDark} onPress={onConsult}>
          <Text style={styles.primaryDarkLabel}>Show a doctor</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: HH.ink },

  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    fontFamily: HHFonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: HH.accent,
  },
  statusText: {
    fontFamily: HHFonts.body,
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },

  shutterRow: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  smallBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutter: {
    width: 78,
    height: 78,
    borderRadius: 40,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: HH.accent,
    shadowColor: HH.accent,
    shadowOpacity: 0.7,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 0 },
    elevation: 12,
  },

  photo: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  photoStamp: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: HH.rPill,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  photoStampText: { color: '#fff', fontFamily: HHFonts.body, fontSize: 10 },

  sectionLabel: {
    fontFamily: HHFonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: HH.inkMuted,
    paddingHorizontal: 4,
    paddingBottom: 8,
  },

  resultActions: { flexDirection: 'row', marginTop: 16 },
  primaryDark: {
    flex: 1,
    backgroundColor: HH.ink,
    borderRadius: HH.rPill,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryDarkLabel: {
    fontFamily: HHFonts.bodyBold,
    fontSize: 13,
    color: HH.accent,
  },
});
