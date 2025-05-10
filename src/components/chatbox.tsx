import { View, Platform, KeyboardAvoidingView, Image, StyleSheet } from 'react-native';
import { GiftedChat, Actions } from 'react-native-gifted-chat';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState, useCallback } from 'react';
import { Send } from 'react-native-gifted-chat';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker'; 
import { InputToolbar, Composer } from 'react-native-gifted-chat';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';
import Ionicons from '@expo/vector-icons/Ionicons';
const { Popover } = renderers


const CustomInputBar = (props: any) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center',paddingVertical:3,paddingHorizontal:15, margin:10, backgroundColor:'white',borderRadius:10 }}>
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
        <MaterialCommunityIcons name="attachment" size={32} color="#141E0D" style={{ padding: 10 }} />
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
        <Octicons name="paper-airplane" size={22} color="#141E0D" style={{ marginLeft:15 }} />
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


const renderBubble = () => {

}
export default function ChatScreen() {
  const [messages, setMessages] = useState([]);

const onSend = useCallback((newMessages = []) => {
  setMessages(previousMessages => {
    const updated = GiftedChat.append(previousMessages, newMessages);
    console.log('Updated messages:', updated);
    return updated;
  });
}, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#faf9f4' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        style={{ flex: 1 }}
      >
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 1,
          }}
          renderMessageImage={renderMessageImage}
          renderInputToolbar={CustomInputBar}
          alwaysShowSend={true}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  anchor:{
    backgroundColor:'#000',
    width:10,
    height:10,
    borderRadius:50,
    marginLeft:5,
  }
})