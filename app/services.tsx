import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Chip, TextInput, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { AssistantHint } from '../components/common/AssistantHint';

const services = [
  { key: 'recharge', label: 'Mobile Recharge', icon: 'phone-portrait' },
  { key: 'dth', label: 'DTH', icon: 'tv' },
  { key: 'electricity', label: 'Electricity', icon: 'flash' },
  { key: 'insurance', label: 'Insurance', icon: 'shield-checkmark' },
  { key: 'loan', label: 'Loan', icon: 'cash' },
  { key: 'fastag', label: 'FASTag', icon: 'car' },
  { key: 'tickets', label: 'Ticket Booking', icon: 'ticket' },
];

export default function ServicesScreen() {
  const [query, setQuery] = React.useState('');
  const filtered = services.filter(s => s.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <AssistantHint suggestions={["Recharge mobile", "Pay electricity", "Book tickets"]} onSuggestionPress={() => {}} />
      <TextInput mode="outlined" placeholder="Search services" value={query} onChangeText={setQuery} left={<TextInput.Icon icon="magnify" />} />
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <Chip style={{ marginRight: 8 }} selected>Popular</Chip>
        <Chip style={{ marginRight: 8 }}>Bills</Chip>
        <Chip>Travel</Chip>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 12 }}>
        {filtered.map(s => (
          <Card key={s.key} style={{ width: '48%', marginBottom: 12, borderRadius: 16 }}>
            <Card.Content style={{ alignItems: 'center', paddingVertical: 20 }}>
              <Ionicons name={s.icon as any} size={28} />
              <Text style={{ marginTop: 8, fontWeight: '700' }}>{s.label}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}