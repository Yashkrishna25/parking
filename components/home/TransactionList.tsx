import React from 'react';
import { View } from 'react-native';
import { List, SegmentedButtons, Text } from 'react-native-paper';

const txs = [
  { id: 't1', title: 'Paid to Ananya', amount: '-₹450', desc: 'Dinner', icon: 'account' },
  { id: 't2', title: 'Received from Rahul', amount: '+₹1,200', desc: 'Rent split', icon: 'account-arrow-left' },
  { id: 't3', title: 'Electricity Bill', amount: '-₹1,650', desc: 'BESCOM', icon: 'flash' },
];

export const TransactionList = () => {
  const [filter, setFilter] = React.useState('all');
  return (
    <View style={{ paddingHorizontal: 8 }}>
      <SegmentedButtons
        value={filter}
        onValueChange={setFilter}
        buttons={[
          { value: 'all', label: 'All' },
          { value: 'debit', label: 'Debit' },
          { value: 'credit', label: 'Credit' },
        ]}
        style={{ marginVertical: 8 }}
      />
      {txs.map(tx => (
        <List.Item key={tx.id} title={tx.title} description={tx.desc} left={(props) => <List.Icon {...props} icon={tx.icon as any} />} right={() => <Text style={{ fontWeight: '700' }}>{tx.amount}</Text>} />
      ))}
    </View>
  );
};