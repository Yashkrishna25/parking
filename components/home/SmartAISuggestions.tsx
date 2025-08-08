import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';

const suggestions = [
  'Split last dinner bill',
  'Pay electricity due',
  'Set monthly budget',
  'Track refund status',
  'Recharge data pack',
];

export const SmartAISuggestions = ({ onSelect }: { onSelect: (text: string) => void }) => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={{ marginBottom: 8, fontWeight: '700' }}>AI Suggestions</Text>
      <View style={styles.row}>
        {suggestions.map(s => (
          <Chip key={s} onPress={() => onSelect(s)} style={styles.chip} icon="lightbulb-on-outline">{s}</Chip>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, marginTop: 8 },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { marginRight: 8, marginVertical: 4 },
});