import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from 'react-native-svg';

type Props = {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  showLastDot?: boolean;
  strokeWidth?: number;
};

export function HHSparkbar({
  data,
  width = 140,
  height = 44,
  color = '#0D1414',
  showLastDot = true,
  strokeWidth = 2,
}: Props) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : 0;
  const pts = data.map((v, i) => ({
    x: i * step,
    y: height - 4 - ((v - min) / range) * (height - 8),
  }));

  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');
  const area = `${path} L${width.toFixed(2)},${height} L0,${height} Z`;

  const id = `spk-${color.replace('#', '')}`;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <Stop offset="100%" stopColor={color} stopOpacity={0} />
        </LinearGradient>
      </Defs>
      <Path d={area} fill={`url(#${id})`} />
      <Path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showLastDot && pts.length > 0 ? (
        <Circle
          cx={pts[pts.length - 1].x}
          cy={pts[pts.length - 1].y}
          r={3}
          fill={color}
        />
      ) : null}
    </Svg>
  );
}
