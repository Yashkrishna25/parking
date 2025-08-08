import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, SegmentedButtons, Card, TextInput, Button, List, Divider } from 'react-native-paper';
import { ExpensePieChart } from '../components/expenses/ExpensePieChart';
import { AssistantHint } from '../components/common/AssistantHint';

export default function ExpensesScreen() {
  const [tab, setTab] = React.useState('all');

  const pie = [
    { label: 'Food', value: 30, color: '#4F8EF7' },
    { label: 'Bills', value: 25, color: '#00BFA6' },
    { label: 'Travel', value: 15, color: '#FF7A59' },
    { label: 'Others', value: 30, color: '#A78BFA' },
  ];

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <AssistantHint suggestions={["Add lunch expense", "Set dining budget", "View July report"]} onSuggestionPress={() => {}} />
      <Card>
        <Card.Title title="Spending Dashboard" subtitle="This month" />
        <Card.Content>
          <Text variant="headlineSmall" style={{ fontWeight: '800' }}>₹ 24,320</Text>
          <Text style={{ opacity: 0.6, marginBottom: 8 }}>Total spending</Text>
          <ExpensePieChart data={pie} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            <Text>Budget used</Text>
            <Text style={{ fontWeight: '700' }}>72%</Text>
          </View>
        </Card.Content>
      </Card>

      <SegmentedButtons value={tab} onValueChange={setTab} style={{ marginTop: 12 }} buttons={[
        { value: 'all', label: 'All Expenses' },
        { value: 'month', label: 'Monthly View' },
        { value: 'categories', label: 'Categories' },
      ]} />

      {tab === 'all' && (
        <View>
          <List.Item title="Zomato" description="Food" right={() => <Text>-₹ 520</Text>} />
          <List.Item title="Uber" description="Travel" right={() => <Text>-₹ 320</Text>} />
          <List.Item title="Electricity" description="Bills" right={() => <Text>-₹ 1,650</Text>} />
        </View>
      )}

      {tab === 'month' && (
        <View>
          <Text>July Total: ₹ 24,320</Text>
          <Text>June Total: ₹ 21,870</Text>
        </View>
      )}

      {tab === 'categories' && (
        <View>
          <List.Item title="Food" right={() => <Text>₹ 8,200</Text>} />
          <List.Item title="Bills" right={() => <Text>₹ 6,100</Text>} />
          <List.Item title="Travel" right={() => <Text>₹ 3,600</Text>} />
        </View>
      )}

      <Card style={{ marginTop: 16 }}>
        <Card.Title title="Add Expense" />
        <Card.Content>
          <TextInput mode="outlined" label="Amount" keyboardType="numeric" style={{ marginBottom: 8 }} />
          <TextInput mode="outlined" label="Date" style={{ marginBottom: 8 }} />
          <TextInput mode="outlined" label="Category" style={{ marginBottom: 8 }} />
          <TextInput mode="outlined" label="Notes" style={{ marginBottom: 8 }} />
          <Button mode="text" icon="file-upload">Upload Receipt</Button>
          <Button mode="contained" style={{ marginTop: 8 }}>Save</Button>
        </Card.Content>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <Card.Title title="Budget Setup" />
        <Card.Content>
          <Text>Overall limit: ₹ 30,000</Text>
          <Text>Food limit: ₹ 9,000</Text>
          <Button mode="outlined" style={{ marginTop: 8 }}>Adjust Limits</Button>
        </Card.Content>
      </Card>

      <Card style={{ marginTop: 16, marginBottom: 24 }}>
        <Card.Title title="AI Tips" />
        <Card.Content>
          <Text>AI Tip: You spent 20% more on dining this week</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}