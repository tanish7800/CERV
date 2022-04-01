import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

import Button from '../../components/Button';
import Roles from '../../components/Roles';
import Colors from '../../constants/Colors';

const SelectRoleScreen = props => {

    const [customerActive, setCustomerActive] = useState(false);
    const [catererActive, setCatererActive] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const customerActiveHandler = () => {
        setCustomerActive(true);
        setCatererActive(false);
        setShowButton(true);
    }

    const catererActiveHandler = () => {
        setCustomerActive(false);
        setCatererActive(true);
        setShowButton(true);
    }


    return(
        <View style={styles.screen}>
            
            {/* Header (Title) */}
            <View style={{flex:1,width:'100%', padding:10}}>
                <Text style={{fontWeight:'bold',fontSize:40}}>Select your Role</Text>
                <Text style={{color:Colors.grey,marginVertical:7,fontWeight:'bold', fontSize:25}}>How do you want to use <Text style={{color:Colors.orange}}>CERV ?</Text></Text>
            </View>

            {/* Body (Options) */}
            <View style={{flex:8}}>
                <View style={{flex:4, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity onPress={customerActiveHandler}>
                        <View style={{alignItems:'center', justifyContent:'center', borderRadius:125, height:250, width:250, borderColor:customerActive? Colors.orange : '#ccc', borderWidth:1.5}}>
                            <Image source={require('../../assets/Icons/002-man.png')} style={{height:150, width:150, opacity: customerActive ? 1:0.3}}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:4, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity onPress={catererActiveHandler}>
                        <View style={{alignItems:'center', justifyContent:'center', borderRadius:125, height:250, width:250, borderColor:catererActive ? Colors.orange :'#ccc', borderWidth:1.5}}>
                            <Image source={require('../../assets/Icons/001-cafe.png')} style={{height:150, width:150,opacity: catererActive ? 1:0.3}}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer (Button) */}
            <View style={{flex:1 ,width:'100%', paddingHorizontal:15, paddingBottom:10,justifyContent:'center'}}>
                {showButton ? <Button 
                    onPress={ () => {
                        props.navigation.navigate('SignInScreen')
                    }}
                    title = { customerActive ? " I'm Customer" : "I'm Caterer" }
                /> : null }
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    }
});

export default SelectRoleScreen;
