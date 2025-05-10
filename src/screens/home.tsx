import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import GroupInfo from '../components/groupInfo';
import ChatBox from '../components/chatbox';
import { MenuProvider } from 'react-native-popup-menu';
import { colors } from '../../utils/colors';
const Home = () => {

  return (
    <SafeAreaView style={{ flex: 1,marginTop:20}} >
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.backText}>Trip 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
        <FontAwesome6 name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
    <GroupInfo/>
    <ChatBox/>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    topBar:{
        flexDirection:'row',
        justifyContent:'space-between', 
        alignItems:'center', 
        marginHorizontal:20,
    },
    backButton: {
        flexDirection:'row',
        gap:12,
        alignItems:'center',
    },
    backText : {
        fontSize: 28,
        color: colors.text,
        fontWeight:'500'
    }
})