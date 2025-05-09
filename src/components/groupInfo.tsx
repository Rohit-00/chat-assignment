import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { MenuProvider } from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
const GroupInfo = () => {
  return (
    <View style={styles.container}>
        <View style={styles.groupDetail}>
            <View style={styles.groupImage}/>
            <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row',gap:4,alignItems:'center'}}>
            <Text>From</Text><Text style={{fontSize:18,fontWeight:'500'}}>IGI Airport, T3</Text>
            </View>
            <View style={{flexDirection:'row',gap:4,alignItems:'center'}}>
            <Text>To</Text><Text style={{fontSize:18,fontWeight:'500'}}>Sector 28</Text>
            </View>
            </View>
            
        </View>
        <TouchableOpacity>
        <Entypo name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity>
    </View>
  )
}

export default GroupInfo

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginTop:20,
        alignItems:'center',
        justifyContent:'space-between'
    },
    groupImage:{
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:'#000',
    },
    groupDetail:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
    }
})