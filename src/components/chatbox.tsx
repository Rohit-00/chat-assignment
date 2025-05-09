import React, { useCallback, useState } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

export default function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Support Bot',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
