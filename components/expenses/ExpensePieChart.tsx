import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

interface Slice { color: string; value: number; label: string }

export const ExpensePieChart = ({ data, size = 160, strokeWidth = 0 }: { data: Slice[]; size?: number; strokeWidth?: number }) => {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let cumulative = 0;

  const center = size / 2;
  const radius = size / 2 - strokeWidth;

  const toCoord = (angle: number) => {
    const a = (angle - 90) * (Math.PI / 180);
    return { x: center + radius * Math.cos(a), y: center + radius * Math.sin(a) };
  };

  const paths = data.map((slice, i) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += slice.value;
    const endAngle = (cumulative / total) * 360;

    const start = toCoord(endAngle);
    const end = toCoord(startAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    const d = [
      `M ${center} ${center}`,
      `L ${end.x} ${end.y}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${start.x} ${start.y}`,
      'Z',
    ].join(' ');

    return <Path key={i} d={d} fill={slice.color} strokeWidth={strokeWidth} />;
  });

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <G>{paths}</G>
      </Svg>
    </View>
  );
};