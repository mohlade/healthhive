import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

export type HHIconName =
  | 'sparkles'
  | 'mic'
  | 'camera'
  | 'scan'
  | 'doctor'
  | 'arrow-right'
  | 'chevron'
  | 'chevron-down'
  | 'plus'
  | 'check'
  | 'bell'
  | 'map'
  | 'sos'
  | 'bolt'
  | 'flame'
  | 'pause'
  | 'play'
  | 'wave'
  | 'flash'
  | 'rotate'
  | 'close'
  | 'pill'
  | 'heart'
  | 'home'
  | 'folder'
  | 'activity'
  | 'user';

type Props = {
  name: HHIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function HHIcon({ name, size = 20, color = '#0D1414', strokeWidth = 1.8 }: Props) {
  const common = {
    stroke: color,
    fill: 'none' as const,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {render(name, color, common)}
    </Svg>
  );
}

function render(
  name: HHIconName,
  color: string,
  s: { stroke: string; fill: 'none'; strokeWidth: number; strokeLinecap: 'round'; strokeLinejoin: 'round' },
) {
  switch (name) {
    case 'sparkles':
      return <Path {...s} d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.5 2.5M16 16l2.5 2.5M5.5 18.5l2.5-2.5M16 8l2.5-2.5" />;
    case 'mic':
      return (
        <>
          <Rect {...s} x={9} y={3} width={6} height={12} rx={3} />
          <Path {...s} d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </>
      );
    case 'camera':
      return (
        <>
          <Path {...s} d="M4 7h3l2-2h6l2 2h3v12H4z" />
          <Circle {...s} cx={12} cy={13} r={3.5} />
        </>
      );
    case 'scan':
      return <Path {...s} d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10" />;
    case 'doctor':
      return (
        <>
          <Circle {...s} cx={12} cy={8} r={4} />
          <Path {...s} d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M12 12v3M10 14h4" />
        </>
      );
    case 'arrow-right':
      return <Path {...s} d="M5 12h14M13 5l7 7-7 7" />;
    case 'chevron':
      return <Path {...s} d="M9 6l6 6-6 6" />;
    case 'chevron-down':
      return <Path {...s} d="M6 9l6 6 6-6" />;
    case 'plus':
      return <Path {...s} d="M12 5v14M5 12h14" />;
    case 'check':
      return <Path {...s} d="M4 12l5 5L20 6" />;
    case 'bell':
      return (
        <>
          <Path {...s} d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <Path {...s} d="M10 21a2 2 0 0 0 4 0" />
        </>
      );
    case 'map':
      return (
        <>
          <Path {...s} d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
          <Path {...s} d="M9 3v15M15 6v15" />
        </>
      );
    case 'sos':
      return (
        <>
          <Circle {...s} cx={12} cy={12} r={9} />
          <Path {...s} d="M12 7v6M12 16v.5" />
        </>
      );
    case 'bolt':
    case 'flash':
      return <Path stroke="none" fill={color} d="M13 2L3 14h7l-1 8 10-12h-7z" />;
    case 'flame':
      return <Path {...s} d="M12 3s3 3 3 7-3 4-3 4-3 0-3-4 3-7 3-7zM12 21c-4 0-7-3-7-7 0-2 1-3 1-3s1 2 3 2c0 0-1-2 0-4 1-2 3-3 3-3s3 4 3 8c2 0 3-2 3-2s1 1 1 3c0 4-3 6-7 6z" />;
    case 'pause':
      return (
        <>
          <Rect {...s} x={6} y={5} width={4} height={14} rx={1} />
          <Rect {...s} x={14} y={5} width={4} height={14} rx={1} />
        </>
      );
    case 'play':
      return <Path stroke="none" fill={color} d="M6 4l14 8-14 8z" />;
    case 'wave':
      return <Path {...s} d="M2 12c2 0 2-4 4-4s2 8 4 8 2-12 4-12 2 8 4 8 2-4 4-4" />;
    case 'rotate':
      return (
        <>
          <Path {...s} d="M23 4v6h-6M1 20v-6h6" />
          <Path {...s} d="M3.5 9A9 9 0 0 1 19 5.3L23 9M1 15l4 3.7A9 9 0 0 0 20.5 15" />
        </>
      );
    case 'close':
      return <Path {...s} d="M6 6l12 12M6 18L18 6" />;
    case 'pill':
      return (
        <>
          <Path {...s} d="M8.5 15.5l7-7a4.95 4.95 0 0 1 7 7l-7 7a4.95 4.95 0 0 1-7-7z" />
          <Path {...s} d="M12 12l7-7" />
        </>
      );
    case 'heart':
      return <Path {...s} d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.06 1.07L12 21.23l7.78-7.78 1.06-1.07a5.5 5.5 0 0 0 0-7.78z" />;
    case 'home':
      return <Path {...s} d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5z" />;
    case 'folder':
      return <Path {...s} d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z" />;
    case 'activity':
      return <Path {...s} d="M22 12h-4l-3 9L9 3l-3 9H2" />;
    case 'user':
      return (
        <>
          <Circle {...s} cx={12} cy={8} r={4} />
          <Path {...s} d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </>
      );
    default:
      return null;
  }
}
