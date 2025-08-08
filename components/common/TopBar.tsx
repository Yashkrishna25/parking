import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text, Avatar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

export const TopBar = ({ userName, onNotificationsPress }: { userName: string; onNotificationsPress: () => void }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Avatar.Text size={36} label={userName.charAt(0)} />
        <View style={{ marginLeft: 12 }}>
          <Text variant="labelSmall" style={{ opacity: 0.6 }}>Welcome</Text>
          <Text variant="titleMedium">{userName}</Text>
        </View>
      </View>
      <IconButton icon="bell-outline" onPress={onNotificationsPress} accessibilityLabel="Notifications" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8 },
  left: { flexDirection: 'row', alignItems: 'center' },
});