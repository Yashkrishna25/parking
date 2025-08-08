import React from 'react';
import { View, ScrollView } from 'react-native';
import { List, Switch, Text, SegmentedButtons, Button } from 'react-native-paper';
import { useAppTheme } from '../components/theme/AppThemeProvider';
import i18n from '../i18n/setup';
import { AssistantHint } from '../components/common/AssistantHint';

export default function ProfileScreen() {
  const { isDarkTheme, toggleTheme } = useAppTheme();
  const [lang, setLang] = React.useState<'en' | 'hi'>('en');
  const [notif, setNotif] = React.useState(true);

  const changeLang = (l: 'en' | 'hi') => {
    setLang(l);
    i18n.changeLanguage(l);
  };

  return (
    <ScrollView>
      <AssistantHint suggestions={["View KYC status", "Change PIN", "Manage devices"]} onSuggestionPress={() => {}} />
      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item title="KYC Status" description="Verified" left={p => <List.Icon {...p} icon="shield-check" />} />
        <List.Item title="Account Details" left={p => <List.Icon {...p} icon="account" />} />
        <List.Item title="Linked Devices" left={p => <List.Icon {...p} icon="cellphone" />} />
      </List.Section>

      <List.Section>
        <List.Subheader>Privacy & Security</List.Subheader>
        <List.Item title="Change PIN" left={p => <List.Icon {...p} icon="lock" />} />
        <List.Item title="App Permissions" left={p => <List.Icon {...p} icon="shield" />} />
      </List.Section>

      <List.Section>
        <List.Subheader>Preferences</List.Subheader>
        <List.Item title="Notifications" right={() => <Switch value={notif} onValueChange={setNotif} />} left={p => <List.Icon {...p} icon="bell-outline" />} />
        <List.Item title="Dark Theme" right={() => <Switch value={isDarkTheme} onValueChange={toggleTheme} />} left={p => <List.Icon {...p} icon="theme-light-dark" />} />
        <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
          <Text variant="titleSmall">Language</Text>
          <SegmentedButtons value={lang} onValueChange={(v) => changeLang(v as 'en' | 'hi')} buttons={[{ value: 'en', label: 'English' }, { value: 'hi', label: 'हिन्दी' }]} />
        </View>
      </List.Section>

      <View style={{ padding: 16 }}>
        <Button mode="outlined">Logout</Button>
      </View>
    </ScrollView>
  );
}