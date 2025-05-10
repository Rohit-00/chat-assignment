import { View, Platform, KeyboardAvoidingView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { GiftedChat, Actions, Bubble, Avatar } from 'react-native-gifted-chat';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState, useCallback, useEffect } from 'react';
import { Send } from 'react-native-gifted-chat';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker'; 
import { InputToolbar, Composer } from 'react-native-gifted-chat';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';
import Ionicons from '@expo/vector-icons/Ionicons';
const { Popover } = renderers

const CustomAvatar = (props: any) => {
  return (
    <View style={{ marginBottom: 20,marginLeft:12 }}>
      <Avatar {...props} />
    </View>
  );
};

const CustomBubble = (props: any) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          marginBottom: 20,
          marginRight:12,
          elevation:5

        },
        left: {
          marginBottom: 20,
          elevation:2

        }
      }}
    />
  );
};
const CustomInputBar = (props: any) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center',paddingVertical:0,paddingHorizontal:15, marginHorizontal:20, backgroundColor:'white',borderRadius:10 }}>
      <Composer
        {...props}
        textInputStyle={{ flex: 1 }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
      {/* <MaterialCommunityIcons
        name="attachment"
        size={32}
        color="black"
        style={{ marginLeft: 10}}
        onPress={async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
          });

          if (!result.canceled && result.assets?.length > 0) {
            const imageMessage = {
              _id: Math.random().toString(36).substring(7),
              createdAt: new Date(),
              user: { _id: 1 },
              image: result.assets[0].uri,
            };

            props.onSend([imageMessage]);
          }
        }}
      /> */}
          <Menu renderer={Popover} rendererProps={{ placement:'top',anchorStyle:{backgroundColor:'green'}}} >
      <MenuTrigger>
        <MaterialCommunityIcons name="attachment" size={30} color="#141E0D" style={{ padding: 10, transform:[{rotate:'135deg'}]  }} />
      </MenuTrigger>

      <MenuOptions customStyles={{
        
        optionsWrapper:{
          flexDirection:"row",
          borderRadius: 10,
          alignItems:'center',
          
        },
        
  optionsContainer: {
    backgroundColor:'green',
    borderRadius: 50,
    flexDirection:'row',
    paddingVertical:5,
    paddingHorizontal:10

  }
}}

>
        <MenuOption onSelect={() => console.log('Camera')} style={{paddingHorizontal:10}}>
          <Ionicons name="camera-outline" size={24} color="white" />
        </MenuOption>
        <MenuOption onSelect={() => console.log('Video')}>
          <Ionicons name="videocam-outline" size={24} color="white" />
        </MenuOption>
        <MenuOption onSelect={() => console.log('Document')}>
          <Ionicons name="document-outline" size={20} color="white" />
        </MenuOption>
      </MenuOptions>
    </Menu>
      <Send {...props} containerStyle={{ justifyContent: 'center', alignItems: 'center' }} >
        <Octicons name="paper-airplane" size={22} color="#141E0D" style={{ marginLeft:8, }} />
      </Send>
      </View>
    </View>
  );
};

const renderMessageImage = (props:any) => {
  const { currentMessage } = props;

  return (
    <View style={{ padding: 5 }}>
      <Image
        source={{ uri: currentMessage.image }}
        style={{ width: 200, height: 150, borderRadius: 10 }}
        resizeMode="cover"
      />
    </View>
  );
};



export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
const renderFooter = () => {
  if (isLoadingEarlier) {
    return (
      <View style={{ padding: 10, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#555" />
      </View>
    );
  }
  return null;
};
const fetchChats = async (page: number) => {
  const response = await fetch(`https://qa.corider.in/assignment/chat?page=${page}`);
  const data = await response.json();
  return data.chats.map((chat: any) => ({
    _id: chat.id,
    text: chat.message.replace(/<br\s*\/?>/gi, '\n'),
    createdAt: new Date(chat.time),
    user: {
      _id: chat.sender.self ? 1 : chat.sender.user_id,
      avatar: chat.sender.image,
      name: chat.sender.user_id
    }
  }));
};

useEffect(() => {
  (async () => {
    const initialMessages = await fetchChats(0);
    setMessages(initialMessages.reverse());
  })();
}, []);

const onLoadEarlier = async () => {
  setIsLoadingEarlier(true);
  const nextPage = page + 1;
  const olderMessages = await fetchChats(nextPage);
  setMessages((prev) => GiftedChat.prepend(prev, olderMessages.reverse()));
  setPage(nextPage);
  setIsLoadingEarlier(false);
};


const onSend = useCallback((newMessages = []) => {
  setMessages(previousMessages => {
    const updated = GiftedChat.append(previousMessages, newMessages);
    return updated;
  });
}, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#faf9f4' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={{ flex: 1, borderTopColor:'#E5E5E0',borderTopWidth:1,marginTop:-10 }}
        
      >
        <GiftedChat
            messages={messages}
  onSend={onSend}
  user={{ _id: 1 }}
  renderMessageImage={renderMessageImage}
  renderInputToolbar={CustomInputBar}
  alwaysShowSend={true}
  renderAvatar={CustomAvatar}
  renderBubble={CustomBubble}
  isLoadingEarlier={isLoadingEarlier}
onLoadEarlier={onLoadEarlier}
          loadEarlier
          infiniteScroll
          listViewProps={{
            initialNumToRender: 20,
            maxToRenderPerBatch: 10,
            windowSize: 5,
            removeClippedSubviews: true,
            onEndReachedThreshold: 0.1,
          }}
     
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

})