import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, TextInput, Button, List, SegmentedButtons, Card, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { AssistantHint } from '../components/common/AssistantHint';

export default function PaymentsScreen() {
  const [tab, setTab] = React.useState('upi');
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <AssistantHint suggestions={["Send ₹500", "Request ₹200", "Scan a QR"]} onSuggestionPress={() => {}} />
      <SegmentedButtons
        value={tab}
        onValueChange={setTab}
        buttons={[
          { value: 'upi', label: 'UPI' },
          { value: 'qr', label: 'Scan QR' },
          { value: 'wallet', label: 'Wallet' },
        ]}
      />

      {tab === 'upi' && (
        <Card style={{ marginTop: 12 }}>
          <Card.Title title="Send / Receive" subtitle="UPI" left={(props) => <Ionicons name="send" size={24} color={theme.colors.primary} />} />
          <Card.Content>
            <TextInput mode="outlined" label="To (Name, UPI ID, Phone)" style={{ marginBottom: 8 }} />
            <TextInput mode="outlined" label="Amount" keyboardType="numeric" style={{ marginBottom: 8 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button mode="contained">Send</Button>
              <Button mode="outlined">Request</Button>
              <Button mode="text">Pick Contact</Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {tab === 'qr' && (
        <Card style={{ marginTop: 12 }}>
          <Card.Title title="QR Scanner" left={(props) => <Ionicons name="qr-code" size={24} color={theme.colors.primary} />} />
          <Card.Content>
            <View style={{ height: 220, borderRadius: 16, backgroundColor: theme.colors.surfaceVariant, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Camera preview placeholder</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <Button icon="image" mode="text">From Gallery</Button>
              <Button icon="flash" mode="text">Toggle Flash</Button>
            </View>
          </Card.Content>
        </Card>
      )}

      {tab === 'wallet' && (
        <Card style={{ marginTop: 12 }}>
          <Card.Title title="Wallet & Bank Accounts" />
          <Card.Content>
            <Text variant="headlineSmall" style={{ fontWeight: '800' }}>₹ 8,540</Text>
            <Text style={{ opacity: 0.6 }}>Wallet Balance</Text>
            <List.Section>
              <List.Subheader>Linked Accounts</List.Subheader>
              <List.Item title="HDFC Bank •••• 1243" left={(p) => <List.Icon {...p} icon="bank" />} right={(p) => <Text>₹ 56,430</Text>} />
              <List.Item title="SBI •••• 7831" left={(p) => <List.Icon {...p} icon="bank-outline" />} right={(p) => <Text>₹ 12,200</Text>} />
            </List.Section>
          </Card.Content>
        </Card>
      )}

      <View style={{ marginTop: 16 }}>
        <Text variant="titleLarge" style={{ fontWeight: '800' }}>Transaction History</Text>
        <SegmentedButtons value={'all'} onValueChange={() => {}} buttons={[{ value: 'all', label: 'All' }, { value: 'debit', label: 'Debit' }, { value: 'credit', label: 'Credit' }]} style={{ marginVertical: 8 }} />
        <List.Item title="Paid to Zomato" description="Food" left={(p) => <List.Icon {...p} icon="food" />} right={() => <Text>-₹ 520</Text>} />
        <List.Item title="Received from Mohit" description="UPI" left={(p) => <List.Icon {...p} icon="account-arrow-left" />} right={() => <Text>+₹ 2,000</Text>} />
      </View>
    </ScrollView>
  );
}