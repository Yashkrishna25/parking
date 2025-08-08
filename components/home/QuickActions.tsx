import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const actions = [
  { key: 'recharge', label: 'Recharge', icon: 'phone-portrait' },
  { key: 'upi', label: 'UPI Transfer', icon: 'send' },
  { key: 'bills', label: 'Bill Payments', icon: 'receipt' },
  { key: 'qr', label: 'QR Scanner', icon: 'qr-code' },
  { key: 'wallet', label: 'Wallet', icon: 'wallet' },
  { key: 'bank', label: 'Bank', icon: 'business' },
];

export const QuickActions = ({ onPress }: { onPress: (key: string) => void }) => {
  return (
    <View style={styles.grid}>
      {actions.map(a => (
        <Button key={a.key} mode="contained-tonal" onPress={() => onPress(a.key)} style={styles.item} contentStyle={{ height: 56 }} icon={(props) => <Ionicons name={a.icon as any} size={20} color={props.color} />}>
          {a.label}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16 },
  item: { width: '48%', marginVertical: 6, borderRadius: 16 },
});