import { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HH, HHFonts } from '../src/theme/tokens';
import { HHIcon } from '../src/components/ui/HHIcon';
import { HHButton } from '../src/components/ui/HHButton';
import { PulsingOrb } from '../src/components/voice/PulsingOrb';
import { Waveform } from '../src/components/voice/Waveform';
import { TriageCard } from '../src/components/voice/TriageCard';
import { SuggestedNextRow } from '../src/components/voice/SuggestedNextRow';

type Phase = 'ready' | 'listening' | 'analyzing' | 'result';

const FULL_TRANSCRIPT =
  "I've had a throbbing headache on the right side since yesterday morning, and I feel a bit nauseous. I haven't slept well in two days.";

const PROMPTS = [
  "I've had a sharp pain in my lower back since this morning.",
  'My daughter has a fever of 38.5 and won’t eat.',
  'I feel dizzy when I stand up quickly.',
];

export default function Voice() {
  const router = useRouter();

  const [phase, setPhase] = useState<Phase>('ready');
  const [transcript, setTranscript] = useState('');

  const typingTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const analyzingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimer.current) clearInterval(typingTimer.current);
      if (analyzingTimer.current) clearTimeout(analyzingTimer.current);
      if (resultTimer.current) clearTimeout(resultTimer.current);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'listening') return;

    let i = 0;
    setTranscript('');
    typingTimer.current = setInterval(() => {
      i += 2;
      if (i >= FULL_TRANSCRIPT.length) {
        setTranscript(FULL_TRANSCRIPT);
        if (typingTimer.current) clearInterval(typingTimer.current);
        analyzingTimer.current = setTimeout(() => setPhase('analyzing'), 400);
        resultTimer.current = setTimeout(() => setPhase('result'), 2200);
        return;
      }
      setTranscript(FULL_TRANSCRIPT.slice(0, i));
    }, 60);

    return () => {
      if (typingTimer.current) clearInterval(typingTimer.current);
    };
  }, [phase]);

  const onMicPress = () => {
    if (phase === 'ready') {
      setPhase('listening');
    } else if (phase === 'listening') {
      if (typingTimer.current) clearInterval(typingTimer.current);
      if (analyzingTimer.current) clearTimeout(analyzingTimer.current);
      if (resultTimer.current) clearTimeout(resultTimer.current);
      setTranscript('');
      setPhase('ready');
    }
  };

  const dark = phase === 'listening' || phase === 'analyzing';

  return (
    <View style={[styles.root, { backgroundColor: dark ? HH.ink : HH.bg }]}>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <Header
          dark={dark}
          phase={phase}
          onClose={() => router.back()}
        />

        {phase !== 'result' ? (
          <View style={styles.center}>
            <PulsingOrb phase={phase} onPress={onMicPress} />
            {phase === 'listening' ? (
              <View style={{ marginTop: 34 }}>
                <Waveform active />
              </View>
            ) : null}
          </View>
        ) : null}

        {(phase === 'listening' || phase === 'analyzing') ? (
          <View style={styles.transcriptWrap}>
            <View style={styles.transcriptCard}>
              {transcript.length === 0 ? (
                <Text style={[styles.transcriptText, { color: 'rgba(255,255,255,0.4)' }]}>…</Text>
              ) : (
                <Text style={styles.transcriptText}>
                  {transcript}
                  {phase === 'listening' ? <Text style={{ color: HH.accent }}>▊</Text> : null}
                </Text>
              )}
            </View>
            <Text style={styles.transcriptHint}>
              {phase === 'analyzing'
                ? 'Cross-referencing with your records and recent vitals…'
                : 'Transcribed on-device · encrypted before upload'}
            </Text>
          </View>
        ) : null}

        {phase === 'ready' ? (
          <View style={styles.promptsWrap}>
            <Text style={styles.promptsLabel}>Try saying…</Text>
            <View style={{ gap: 8 }}>
              {PROMPTS.map((p, i) => (
                <Pressable
                  key={i}
                  onPress={() => setPhase('listening')}
                  style={({ pressed }) => [styles.promptCard, pressed && { opacity: 0.85 }]}
                >
                  <Text style={styles.promptText}>“{p}”</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {phase === 'result' ? (
          <ResultView
            transcript={FULL_TRANSCRIPT}
            onConsult={() => router.replace('/consult')}
            onClose={() => router.back()}
          />
        ) : null}
      </SafeAreaView>
    </View>
  );
}

function Header({
  dark,
  phase,
  onClose,
}: {
  dark: boolean;
  phase: Phase;
  onClose: () => void;
}) {
  const status =
    phase === 'ready' ? 'Tap the mic and tell me how you feel'
    : phase === 'listening' ? 'Listening — speak naturally'
    : phase === 'analyzing' ? 'Analyzing your symptoms…'
    : "Here’s what I heard";

  return (
    <View style={styles.header}>
      <Pressable
        onPress={onClose}
        style={[
          styles.closeBtn,
          {
            backgroundColor: dark ? 'rgba(255,255,255,0.08)' : HH.surface,
            borderColor: dark ? 'rgba(255,255,255,0.1)' : HH.line,
          },
        ]}
      >
        <HHIcon name="close" size={18} color={dark ? '#fff' : HH.ink} />
      </Pressable>
      <View style={{ flex: 1 }}>
        <Text style={[styles.eyebrow, { color: dark ? HH.accent : HH.inkMuted }]}>
          Hive AI · Voice check
        </Text>
        <Text style={[styles.statusText, { color: dark ? 'rgba(255,255,255,0.75)' : HH.inkSoft }]}>
          {status}
        </Text>
      </View>
    </View>
  );
}

function ResultView({
  transcript,
  onConsult,
  onClose,
}: {
  transcript: string;
  onConsult: () => void;
  onClose: () => void;
}) {
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32, paddingTop: 4 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.recapCard}>
        <Text style={styles.recapEyebrow}>You said</Text>
        <Text style={styles.recapText}>“{transcript}”</Text>
      </View>

      <View style={{ marginTop: 12 }}>
        <TriageCard
          badge="Hive AI · Moderate urgency"
          copyLead="Could be a "
          copyAccent="tension migraine"
          copyTrail=" triggered by sleep debt."
          body="Unilateral head pain + nausea + sleep disruption is a common pattern. I recommend a doctor review within 24 hours."
        />
      </View>

      <View style={{ marginTop: 14 }}>
        <Text style={styles.sectionLabel}>Suggested next</Text>
        <View style={{ gap: 8 }}>
          <SuggestedNextRow
            icon="doctor"
            title="Book a consult"
            sub="3 GPs online now · avg 5 min wait"
            cta="Book"
            onPress={onConsult}
          />
          <SuggestedNextRow
            icon="pill"
            title="Log paracetamol 500mg"
            sub="Last taken 4h ago · safe to repeat"
            cta="Log"
          />
          <SuggestedNextRow
            icon="activity"
            title="Add to symptom diary"
            sub="Track pattern to share at consult"
            cta="Add"
          />
        </View>
      </View>

      <View style={{ marginTop: 16 }}>
        <HHButton label="Done" variant="darkGhost" fullWidth onPress={onClose} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    fontFamily: HHFonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  statusText: { fontFamily: HHFonts.body, fontSize: 13, marginTop: 2 },

  center: {
    flex: 1,
    minHeight: 360,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  transcriptWrap: { paddingHorizontal: 20, paddingBottom: 24, paddingTop: 14 },
  transcriptCard: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    minHeight: 80,
  },
  transcriptText: {
    fontFamily: HHFonts.displayItalic,
    fontSize: 16,
    lineHeight: 25,
    color: '#fff',
  },
  transcriptHint: {
    fontFamily: HHFonts.body,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 10,
    textAlign: 'center',
  },

  promptsWrap: { paddingHorizontal: 20, paddingBottom: 28, paddingTop: 6 },
  promptsLabel: {
    fontFamily: HHFonts.body,
    fontSize: 12,
    color: HH.inkMuted,
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  promptCard: {
    backgroundColor: HH.surface,
    borderColor: HH.line,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  promptText: {
    fontFamily: HHFonts.displayItalic,
    fontSize: 14,
    color: HH.inkSoft,
    lineHeight: 20,
  },

  recapCard: {
    backgroundColor: HH.surface,
    borderColor: HH.line,
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
  },
  recapEyebrow: {
    fontFamily: HHFonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: HH.inkMuted,
  },
  recapText: {
    fontFamily: HHFonts.displayItalic,
    fontSize: 15,
    lineHeight: 23,
    color: HH.inkSoft,
    marginTop: 6,
  },

  sectionLabel: {
    fontFamily: HHFonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: HH.inkMuted,
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
});
