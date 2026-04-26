import { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { HH } from '../../theme/tokens';

type Phase = 'capture' | 'analyzing' | 'result';

type Props = { phase: Phase };

const FRAME_W = '50%';
const FRAME_H = '40%';

export function Viewfinder({ phase }: Props) {
  const [frameH, setFrameH] = useState(0);
  const t = useSharedValue(0);

  useEffect(() => {
    if (phase === 'analyzing') {
      t.value = 0;
      t.value = withRepeat(
        withTiming(1, { duration: 1400, easing: Easing.linear }),
        -1,
        false,
      );
    } else {
      cancelAnimation(t);
      t.value = 0;
    }
    return () => cancelAnimation(t);
  }, [phase, t]);

  const scanlineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: t.value * Math.max(0, frameH - 2) }],
  }));

  const onFrameLayout = (e: LayoutChangeEvent) => {
    setFrameH(e.nativeEvent.layout.height);
  };

  return (
    <View style={styles.wrap}>
      {/* Faux camera background (replace with expo-camera <CameraView/>) */}
      <LinearGradient
        colors={['#3a2a22', '#5a3a2a', '#7a4a32']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={[StyleSheet.absoluteFill, styles.skinHotspot]} />

      {/* Detection frame */}
      <View pointerEvents="none" style={styles.frameContainer}>
        <View
          onLayout={onFrameLayout}
          style={[
            styles.frame,
            { width: FRAME_W as `${number}%`, height: FRAME_H as `${number}%` },
          ]}
        >
          {/* Corner brackets */}
          {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
            <View
              key={c}
              style={[
                styles.corner,
                c[0] === 't' ? { top: -4 } : { bottom: -4 },
                c[1] === 'l' ? { left: -4 } : { right: -4 },
                c[0] === 't' ? { borderTopWidth: 3 } : { borderBottomWidth: 3 },
                c[1] === 'l' ? { borderLeftWidth: 3 } : { borderRightWidth: 3 },
              ]}
            />
          ))}

          {phase === 'analyzing' ? (
            <Animated.View pointerEvents="none" style={[styles.scanline, scanlineStyle]} />
          ) : null}
        </View>
      </View>

      {/* Overlay rectangles forming the dark mask around the frame.
          The frame is centered at 50% × 40% of the viewfinder. */}
      <Mask />

      {/* Status pill */}
      <View style={styles.statusPillWrap}>
        <View style={styles.statusPill}>
          <View style={styles.statusDot} />
          <Animated.Text style={styles.statusLabel}>
            {phase === 'analyzing' ? 'Processing on-device' : 'Hold steady — 12cm away'}
          </Animated.Text>
        </View>
      </View>

      {/* Tip pill */}
      <View style={styles.tipWrap}>
        <Animated.Text style={styles.tipText}>
          <Animated.Text style={styles.tipKey}>Tip: </Animated.Text>
          good lighting, plain background, focus on the affected area.
        </Animated.Text>
      </View>
    </View>
  );
}

function Mask() {
  // Frame: width 50%, height 40%, centered → side bands 25%, top/bottom bands 30%.
  const dim = 'rgba(13,20,20,0.42)';
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {/* Top band */}
      <View style={[styles.maskBlock, { top: 0, left: 0, right: 0, height: '30%', backgroundColor: dim }]} />
      {/* Bottom band */}
      <View style={[styles.maskBlock, { bottom: 0, left: 0, right: 0, height: '30%', backgroundColor: dim }]} />
      {/* Left band */}
      <View style={[styles.maskBlock, { top: '30%', left: 0, width: '25%', height: '40%', backgroundColor: dim }]} />
      {/* Right band */}
      <View style={[styles.maskBlock, { top: '30%', right: 0, width: '25%', height: '40%', backgroundColor: dim }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    margin: 16,
    marginTop: 8,
    marginBottom: 12,
    borderRadius: HH.rXl,
    overflow: 'hidden',
    position: 'relative',
  },
  skinHotspot: {
    backgroundColor: 'transparent',
  },
  frameContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    borderColor: HH.accent,
    borderWidth: 2,
    borderRadius: 16,
    position: 'relative',
    shadowColor: HH.accent,
    shadowOpacity: 0.7,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },
  corner: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderColor: HH.accent,
    borderRadius: 4,
  },
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 2,
    backgroundColor: HH.accent,
    shadowColor: HH.accent,
    shadowOpacity: 0.9,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },
  maskBlock: { position: 'absolute' },

  statusPillWrap: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: HH.rPill,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: HH.accent },
  statusLabel: { color: '#fff', fontSize: 11, fontWeight: '500' },

  tipWrap: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
    padding: 12,
  },
  tipText: { color: 'rgba(255,255,255,0.85)', fontSize: 12, lineHeight: 17 },
  tipKey: { color: HH.accent, fontWeight: '700' },
});
