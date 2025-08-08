import React from 'react';
import { View } from 'react-native';
import { Banner, Chip, Text } from 'react-native-paper';

export interface AssistantHintProps {
  visible?: boolean;
  title?: string;
  suggestions?: string[];
  onSuggestionPress?: (s: string) => void;
}

export const AssistantHint = ({ visible = true, title = 'Need help? Ask the assistant.', suggestions = [], onSuggestionPress }: AssistantHintProps) => {
  return (
    <View style={{ marginTop: 8, marginHorizontal: 16 }}>
      <Banner visible={visible} icon="robot-happy-outline">
        <Text>{title}</Text>
        {suggestions.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
            {suggestions.map((s) => (
              <Chip key={s} style={{ marginRight: 8, marginBottom: 8 }} mode="outlined" onPress={() => onSuggestionPress && onSuggestionPress(s)}>
                {s}
              </Chip>
            ))}
          </View>
        )}
      </Banner>
    </View>
  );
};