import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, Chip, Card, Avatar, ActivityIndicator, IconButton } from 'react-native-paper';
import { ChatbotInput } from '../components/chat/ChatbotInput';
import { useTranslation } from 'react-i18next';

const categories = ['Payments', 'Refunds', 'KYC', 'Offers', 'Technical Support'];

export default function ChatScreen() {
  const [messages, setMessages] = React.useState<{ id: string; from: 'bot' | 'user'; text: string }[]>([
    { id: 'm1', from: 'bot', text: "Hi, I'm your Paytm Assistant. How can I help?" },
  ]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const { t } = useTranslation();

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now().toString(), from: 'user' as const, text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { id: Date.now().toString(), from: 'bot', text: 'I can help with payments, refunds, KYC and more. Creating a ticket for you.' }]);
    }, 800);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <View style={{ alignItems: item.from === 'user' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
            <Card style={{ maxWidth: '80%', borderRadius: 16 }}>
              <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
                {item.from === 'bot' && <Avatar.Icon size={28} icon="robot" style={{ marginRight: 8 }} />}
                <Text>{item.text}</Text>
                <IconButton icon="emoticon-outline" size={18} onPress={() => send('👍')} />
              </Card.Content>
            </Card>
          </View>
        )}
        ListHeaderComponent={
          <View>
            <Text variant="titleLarge" style={{ fontWeight: '800', marginBottom: 8 }}>Support Categories</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
              {categories.map(c => (
                <Chip key={c} style={{ marginRight: 8, marginBottom: 8 }} onPress={() => send(c)}>{c}</Chip>
              ))}
            </View>
            <Text variant="titleMedium" style={{ fontWeight: '700', marginBottom: 6 }}>Suggestions</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {['Track order', 'Refund status', 'Update KYC'].map(s => (
                <Chip key={s} mode="outlined" style={{ marginRight: 8, marginBottom: 8 }} onPress={() => send(s)}>{s}</Chip>
              ))}
            </View>
          </View>
        }
        ListFooterComponent={typing ? <ActivityIndicator style={{ marginTop: 8 }} /> : null}
      />
      <ChatbotInput value={input} onChangeText={setInput} onSend={() => send(input)} onMic={() => send('🎤 Voice message')} />
    </View>
  );
}