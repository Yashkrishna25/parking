import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, TextInput, useTheme, Switch } from 'react-native-paper';
import { useAppTheme } from '../theme/AppThemeProvider';

export const ChatbotInput = ({ value, onChangeText, onSend, onMic }: { value: string; onChangeText: (t: string) => void; onSend: () => void; onMic: () => void }) => {
  const theme = useTheme();
  const { isDarkTheme, toggleTheme } = useAppTheme();
  return (
    <View style={[styles.row, { backgroundColor: theme.colors.surface }]}>
      <IconButton icon="microphone" onPress={onMic} accessibilityLabel="Voice input" />
      <TextInput
        mode="outlined"
        style={{ flex: 1 }}
        placeholder="Type your message"
        value={value}
        onChangeText={onChangeText}
      />
      <IconButton icon="send" onPress={onSend} accessibilityLabel="Send" />
      <Switch value={isDarkTheme} onValueChange={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4 },
});