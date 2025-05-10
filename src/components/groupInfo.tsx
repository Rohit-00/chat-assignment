import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import { colors } from '../../utils/colors';
const GroupInfo = () => {
  return (
    <View style={styles.container}>
        <View style={styles.groupDetail}>
            <View style={styles.groupImage}/>
            <View style={{flexDirection:'column'}}>
            <View style={{flexDirection:'row',gap:4,alignItems:'baseline'}}>
            <Text style={{color:"#606060"}}>From</Text><Text style={{fontSize:18,fontWeight:'500',color:colors.text}}>IGI Airport, T3</Text>
            </View>
            <View style={{flexDirection:'row',gap:4,alignItems:'baseline'}}>
            <Text style={{color:"#606060"}}>To</Text><Text style={{fontSize:18,fontWeight:'500',color:colors.text}}>Sector 28</Text>
            </View>
            </View>
            
        </View>
        <TouchableOpacity>
            <Menu>
        <MenuTrigger>
        <Entypo name="dots-three-vertical" size={24} color={colors.text} />
        </MenuTrigger>
        <MenuOptions customStyles={{
            optionsWrapper:{
               borderWidth:0.5,
               borderColor:'#E5E5E0'
            },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    padding:0,
    width:190,
    elevation: 5,

  }
}}
>
        <MenuOption onSelect={() => alert(`Save`)} style={{borderBottomWidth:0.5,borderBottomColor:'#E5E5E0',padding:15,flexDirection:'row', gap:8}} >
            <Ionicons name="people-outline" size={24} color={colors.text} />
            <Text style={styles.menuText}>Members</Text>
            </MenuOption>
        <MenuOption onSelect={() => alert(`Delete`)} style={{borderBottomWidth:0.5,borderBottomColor:'#E5E5E0',padding:15, flexDirection:'row',gap:8}} >
            <Ionicons name="call-outline" size={24} color={colors.text} />
          <Text style={styles.menuText}>Share Number</Text>
        </MenuOption>
        <MenuOption onSelect={() => alert(`Not called`)} style={{padding:15, flexDirection:'row', gap:8}} >
            <MaterialCommunityIcons name="chat-remove-outline" size={24} color={colors.text} />
            <Text style={styles.menuText}>Report</Text>
            </MenuOption>
      </MenuOptions>
      </Menu>
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
        justifyContent:'space-between',
        marginHorizontal:20,
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
    },
    menuText:{
        fontSize:18,
        color:colors.text,

    }
})