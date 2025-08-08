import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { neumorphicShadow } from '../theme/AppThemeProvider';

const width = Dimensions.get('window').width;

const items = [
  { id: '1', title: 'Get 10% Cashback on Mobile Recharge' },
  { id: '2', title: 'Electricity Bill: Flat ₹50 Off' },
  { id: '3', title: 'Movie Tickets: Buy 1 Get 1' },
];

export const OfferCarousel = () => {
  const theme = useTheme();
  const isDark = theme.dark;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
      {items.map(item => (
        <View key={item.id} style={[styles.card, neumorphicShadow(isDark), { backgroundColor: theme.colors.surface }]}>
          <Text variant="titleMedium" style={{ fontWeight: '700' }}>{item.title}</Text>
          <Text variant="labelSmall" style={{ opacity: 0.6, marginTop: 6 }}>Personalized for you</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.78,
    marginRight: 12,
    padding: 16,
    borderRadius: 20,
  },
});