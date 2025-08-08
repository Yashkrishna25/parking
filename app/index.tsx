import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, useTheme, Divider, Banner } from 'react-native-paper';
import { TopBar } from '../components/common/TopBar';
import { QuickActions } from '../components/home/QuickActions';
import { OfferCarousel } from '../components/home/OfferCarousel';
import { SmartAISuggestions } from '../components/home/SmartAISuggestions';
import { TransactionList } from '../components/home/TransactionList';
import { AssistantHint } from '../components/common/AssistantHint';

export default function HomeScreen() {
  const theme = useTheme();

  const onAction = (key: string) => {
    // Navigate or show placeholders
  };

  return (
    <ScrollView>
      <TopBar userName="Aarav" onNotificationsPress={() => {}} />

      <QuickActions onPress={onAction} />

      <AssistantHint suggestions={["Recharge now", "Pay electricity bill", "Send UPI to Raj"]} onSuggestionPress={() => {}} />

      <View style={{ marginTop: 12 }}>
        <Text variant="titleLarge" style={{ paddingHorizontal: 16, fontWeight: '800' }}>Recent Transactions</Text>
        <TransactionList />
      </View>

      <View style={{ marginTop: 16 }}>
        <Text variant="titleLarge" style={{ paddingHorizontal: 16, fontWeight: '800' }}>Offers for you</Text>
        <OfferCarousel />
      </View>

      <View style={{ marginTop: 16, marginBottom: 24 }}>
        <SmartAISuggestions onSelect={(s) => {}} />
      </View>

      <Banner visible icon="robot-excited-outline">
        AI Tip: You spent 20% more on dining this week
      </Banner>
    </ScrollView>
  );
}