import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { HH, HHFonts } from '../../src/theme/tokens';
import { HHRing } from '../../src/components/ui/HHRing';
import { HHIcon } from '../../src/components/ui/HHIcon';
import { HHChip } from '../../src/components/ui/HHChip';
import { HHButton } from '../../src/components/ui/HHButton';
import { HHAnimatedNumber } from '../../src/components/ui/HHAnimatedNumber';
import { ScoreBreakdown } from '../../src/components/dashboard/ScoreBreakdown';
import { AIInsightCard } from '../../src/components/dashboard/AIInsightCard';
import { WearableStrip } from '../../src/components/dashboard/WearableStrip';
import { TrendCard } from '../../src/components/dashboard/TrendCard';
import { AIActionCard } from '../../src/components/dashboard/AIActionCard';
import { RadialGlow } from '../../src/components/dashboard/RadialGlow';

import { useStore } from '../../src/state/useStore';
import {
  mockAIInsight,
  mockHealthScoreDelta,
  mockHealthHeadline,
  mockHealthSubhead,
  mockMoods,
  mockScoreFactors,
  mockUser,
} from '../../src/data/mocks';

const COLLAPSE_RANGE = 140;
const HEADER_BG_THRESHOLD = 70;

export default function Dashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { healthScore, vitals, wearables, selectedMood, setMood } = useStore();

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const heroStyle = useAnimatedStyle(() => {
    const t = Math.min(1, Math.max(0, scrollY.value / COLLAPSE_RANGE));
    return {
      transform: [{ scale: 1 - 0.15 * t }],
      opacity: 1 - 0.3 * t,
    };
  });

  const headerOverlayStyle = useAnimatedStyle(() => {
    const t = Math.min(1, Math.max(0, scrollY.value / COLLAPSE_RANGE));
    return { opacity: 0.6 + t * 0.35 };
  });

  const headerBorderStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [HEADER_BG_THRESHOLD, HEADER_BG_THRESHOLD + 30], [0, 1], 'clamp'),
  }));

  const headerCondensedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [HEADER_BG_THRESHOLD, HEADER_BG_THRESHOLD + 30], [0, 1], 'clamp'),
  }));

  const headerExpandedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [HEADER_BG_THRESHOLD, HEADER_BG_THRESHOLD + 30], [1, 0], 'clamp'),
  }));

  const headerHeight = 60 + insets.top;
  const tabBarSpacing = 100;

  const trends = useMemo(
    () => [
      { key: 'hr',    label: 'Heart rate',  value: String(vitals.hr.value),                     unit: 'bpm',   delta: vitals.hr.delta,    positive: vitals.hr.positive,    data: vitals.hr.series,    color: HH.accent },
      { key: 'bp',    label: 'BP systolic', value: String(vitals.bp.value),                     unit: 'mmHg',  delta: vitals.bp.delta,    positive: vitals.bp.positive,    data: vitals.bp.series,    color: HH.warning },
      { key: 'sleep', label: 'Sleep',       value: vitals.sleep.value.toFixed(1),               unit: 'h',     delta: vitals.sleep.delta, positive: vitals.sleep.positive, data: vitals.sleep.series, color: HH.accentSky },
      { key: 'steps', label: 'Steps',       value: `${(vitals.steps.value / 1000).toFixed(1)}k`, unit: '/day',  delta: vitals.steps.delta, positive: vitals.steps.positive, data: vitals.steps.series, color: HH.success },
    ],
    [vitals],
  );

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: headerHeight + 4,
          paddingBottom: insets.bottom + tabBarSpacing,
        }}
      >
        {/* HERO */}
        <Animated.View style={[styles.heroWrap, heroStyle]}>
          <View style={styles.hero}>
            <LinearGradient
              colors={['#0D1414', '#1a2626', '#1a2626']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <RadialGlow
              size={220}
              color={HH.accent}
              intensity={0.4}
              style={{ position: 'absolute', top: -60, right: -40 }}
            />
            <RadialGlow
              size={240}
              color={HH.accent}
              intensity={0.1}
              style={{ position: 'absolute', bottom: -100, left: -80 }}
            />

            <View style={styles.heroTopRow}>
              <HHRing
                value={healthScore}
                size={160}
                strokeWidth={10}
                progressColor={HH.accent}
              >
                <Text style={styles.ringEyebrow}>Health score</Text>
                <HHAnimatedNumber value={healthScore} style={styles.ringNumber} />
                <Text style={styles.ringDelta}>{mockHealthScoreDelta}</Text>
              </HHRing>

              <View style={styles.heroCopy}>
                <Text style={styles.heroDate}>{mockUser.date}</Text>
                <Text style={styles.heroHeadline}>
                  You're <Text style={styles.heroHeadlineAccent}>{mockHealthHeadline}</Text>.
                </Text>
                <Text style={styles.heroSub}>{mockHealthSubhead}</Text>
              </View>
            </View>

            <View style={{ marginTop: 22 }}>
              <ScoreBreakdown factors={mockScoreFactors} accent={HH.accent} />
            </View>

            <Pressable style={styles.heroCta}>
              <Text style={styles.heroCtaLabel}>See full report</Text>
              <HHIcon name="arrow-right" size={14} color="#fff" />
            </Pressable>
          </View>
        </Animated.View>

        {/* MOOD */}
        <View style={styles.sectionLabelRow}>
          <Text style={styles.sectionLabel}>Today's check-in</Text>
          <Text style={styles.sectionHint}>Tap to log</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moodRow}
        >
          {mockMoods.map((m) => (
            <HHChip
              key={m.id}
              label={m.label}
              emoji={m.emoji}
              selected={selectedMood === m.id}
              onPress={() => setMood(m.id)}
            />
          ))}
        </ScrollView>

        {/* AI insight */}
        <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 6 }}>
          <AIInsightCard
            badge={mockAIInsight.badge}
            copyLead={mockAIInsight.copyLead}
            copyAccent={mockAIInsight.copyAccent}
            copyTrail={mockAIInsight.copyTrail}
            body={mockAIInsight.body}
            onAskAI={() => router.push('/voice')}
            onBookConsult={() => router.push('/consult')}
          />
        </View>

        {/* Wearables */}
        <View style={{ paddingTop: 14 }}>
          <Text style={[styles.sectionLabel, { paddingHorizontal: 20, paddingBottom: 8 }]}>
            Connected
          </Text>
          <WearableStrip devices={wearables} />
        </View>

        {/* Trends */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <View style={styles.trendsHeader}>
            <Text style={styles.sectionDisplay}>
              Your <Text style={styles.italic}>trends</Text>
            </Text>
            <Pressable style={styles.rangePill}>
              <Text style={styles.rangeLabel}>30d</Text>
              <HHIcon name="chevron-down" size={12} color={HH.inkMuted} />
            </Pressable>
          </View>
          <View style={styles.trendsGrid}>
            <View style={styles.trendCol}>
              <TrendCard {...trends[0]} />
              <TrendCard {...trends[2]} />
            </View>
            <View style={styles.trendCol}>
              <TrendCard {...trends[1]} />
              <TrendCard {...trends[3]} />
            </View>
          </View>
        </View>

        {/* AI Quick Actions */}
        <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
          <Text style={[styles.sectionDisplay, { paddingBottom: 12 }]}>
            Powered by <Text style={styles.italic}>Hive AI</Text>
          </Text>
          <View style={styles.actionsGrid}>
            <View style={styles.actionsCol}>
              <AIActionCard
                icon="mic"
                label="Voice symptom check"
                hint="Describe how you feel"
                color={HH.accent}
                onPress={() => router.push('/voice')}
              />
              <AIActionCard
                icon="scan"
                label="Prescription scan"
                hint="Add meds from a label"
                color={HH.accentSky}
                onPress={() => router.push('/rx')}
              />
            </View>
            <View style={styles.actionsCol}>
              <AIActionCard
                icon="camera"
                label="Scan a symptom"
                hint="Rash · eye · skin"
                color={HH.accentPink}
                onPress={() => router.push('/camera')}
              />
              <AIActionCard
                icon="doctor"
                label="Visit summary"
                hint="Recap your last consult"
                color={HH.warning}
                onPress={() => router.push('/(tabs)/records')}
              />
            </View>
          </View>
        </View>

        {/* Emergency ride */}
        <View style={{ paddingHorizontal: 16, paddingTop: 18 }}>
          <Pressable onPress={() => router.push('/ride')} style={styles.rideCard}>
            <View style={styles.rideIcon}>
              <HHIcon name="map" size={22} color={HH.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rideTitle}>Need a ride to care?</Text>
              <Text style={styles.rideHint}>Bolt · Uber · Ambulance</Text>
            </View>
            <HHIcon name="arrow-right" size={18} color={HH.ink} />
          </Pressable>
        </View>

        {/* SOS */}
        <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
          <HHButton
            label="Emergency SOS"
            variant="danger"
            size="lg"
            uppercase
            fullWidth
            onPress={() => router.push('/sos')}
            iconLeft={<HHIcon name="sos" size={18} color="#fff" strokeWidth={2.2} />}
          />
        </View>
      </Animated.ScrollView>

      {/* Sticky header */}
      <View style={[styles.headerWrap, { height: headerHeight, paddingTop: insets.top }]} pointerEvents="box-none">
        <BlurView tint="light" intensity={36} style={StyleSheet.absoluteFill} />
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: HH.bg }, headerOverlayStyle]} />
        <Animated.View
          style={[
            styles.headerBorder,
            { borderBottomColor: HH.line },
            headerBorderStyle,
          ]}
        />
        <View style={styles.headerInner}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{mockUser.initials}</Text>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Animated.Text style={[styles.headerEyebrow, headerExpandedStyle]} numberOfLines={1}>
              Welcome back
            </Animated.Text>
            <Animated.Text
              style={[styles.headerEyebrow, styles.headerEyebrowFloat, headerCondensedStyle]}
              numberOfLines={1}
            >
              {mockUser.firstName} · {healthScore}/100
            </Animated.Text>
            <Animated.Text style={[styles.headerTitle, headerExpandedStyle]} numberOfLines={1}>
              {mockUser.firstName} {mockUser.lastName}
            </Animated.Text>
            <Animated.Text
              style={[styles.headerTitle, styles.headerTitleFloat, headerCondensedStyle]}
              numberOfLines={1}
            >
              Feeling better today?
            </Animated.Text>
          </View>
          <Pressable style={styles.bell}>
            <HHIcon name="bell" size={18} color={HH.ink} />
            <View style={styles.bellDot} />
          </Pressable>
        </View>
      </View>

      <SafeAreaView style={styles.statusBg} pointerEvents="none" edges={['top']} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: HH.bg },

  statusBg: { position: 'absolute', top: 0, left: 0, right: 0 },

  headerWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    zIndex: 30,
  },
  headerBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: HH.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: HH.accent,
    fontFamily: HHFonts.displayItalic,
    fontSize: 14,
  },
  headerEyebrow: {
    fontFamily: HHFonts.bodySemibold,
    fontSize: 11,
    color: HH.inkMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  headerEyebrowFloat: { position: 'absolute', top: 0, left: 0, right: 0 },
  headerTitle: {
    fontFamily: HHFonts.bodySemibold,
    fontSize: 15,
    color: HH.ink,
    marginTop: 1,
  },
  headerTitleFloat: { position: 'absolute', top: 14, left: 0, right: 0 },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: HH.surface,
    borderWidth: 1,
    borderColor: HH.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 9,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: HH.accent,
    borderWidth: 1.5,
    borderColor: HH.surface,
  },

  heroWrap: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 },
  hero: {
    borderRadius: HH.rXl + 4,
    padding: 22,
    overflow: 'hidden',
  },
  heroTopRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 16 },
  ringEyebrow: {
    fontFamily: HHFonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.6)',
  },
  ringNumber: {
    fontFamily: HHFonts.display,
    fontSize: 64,
    lineHeight: 64,
    color: '#fff',
    marginTop: 2,
    padding: 0,
    textAlign: 'center',
    minWidth: 90,
  },
  ringDelta: {
    fontFamily: HHFonts.bodySemibold,
    fontSize: 12,
    color: HH.accent,
    marginTop: 2,
  },
  heroCopy: { flex: 1, minWidth: 0, paddingTop: 8 },
  heroDate: {
    fontFamily: HHFonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
  },
  heroHeadline: {
    fontFamily: HHFonts.display,
    fontSize: 26,
    lineHeight: 30,
    color: '#fff',
    marginTop: 4,
    letterSpacing: -0.4,
  },
  heroHeadlineAccent: {
    fontFamily: HHFonts.displayItalic,
    color: HH.accent,
  },
  heroSub: {
    fontFamily: HHFonts.body,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 6,
    lineHeight: 18,
  },
  heroCta: {
    marginTop: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderRadius: HH.rPill,
  },
  heroCtaLabel: {
    fontFamily: HHFonts.bodySemibold,
    color: '#fff',
    fontSize: 13,
  },

  sectionLabelRow: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    fontFamily: HHFonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: HH.inkMuted,
  },
  sectionHint: {
    fontFamily: HHFonts.body,
    fontSize: 11,
    color: HH.inkMuted,
  },
  sectionDisplay: {
    fontFamily: HHFonts.display,
    fontSize: 22,
    color: HH.ink,
    letterSpacing: -0.3,
  },
  italic: { fontFamily: HHFonts.displayItalic },
  moodRow: { gap: 8, paddingHorizontal: 20, paddingTop: 6, paddingBottom: 8 },

  trendsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  rangePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rangeLabel: {
    fontFamily: HHFonts.bodySemibold,
    fontSize: 12,
    color: HH.inkMuted,
  },
  trendsGrid: { flexDirection: 'row', gap: 10 },
  trendCol: { flex: 1, gap: 10 },

  actionsGrid: { flexDirection: 'row', gap: 10 },
  actionsCol: { flex: 1, gap: 10 },

  rideCard: {
    backgroundColor: HH.surface,
    borderRadius: HH.rLg,
    padding: 16,
    borderWidth: 1,
    borderColor: HH.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  rideIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: HH.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rideTitle: { fontFamily: HHFonts.bodySemibold, fontSize: 14, color: HH.ink },
  rideHint: { fontFamily: HHFonts.body, fontSize: 12, color: HH.inkMuted, marginTop: 2 },
});
