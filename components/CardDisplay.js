import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

const CardDisplay = props => {
    return (
        <View style={styles.shadow} > 
            <View style={{flexDirection:'row'}}>
                {/* Logo */}
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Image source={props.image} style={{height:50, width:50}} />
                </View>

                {/* Details */}
                <View style={{flex:3}}>
                    {/* Number & Edit */}
                    <View style={{flex:2, flexDirection:'row', justifyContent:'space-between'}} >
                        <Text style={{fontSize:15, fontWeight:'700'}} >{props.cardNumber}</Text>
                        <TouchableOpacity>
                            <Ionicon name="create-outline" size={20} color="#5DCCE0"/>
                        </TouchableOpacity>
                    </View>

                    {/* Expiry */}
                    <View style={{flex:1}}>
                        <Text>Expires {props.expiry}</Text>
                    </View>
                </View>

                {/* Checkmark */}
                <View style={{flex:0.7, alignItems:'center', justifyContent:'center'}}>
                    <TouchableOpacity>
                        <Ionicon name="checkmark-circle" size={32} color="#33E376"/>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadow:{
        marginTop:15,
        width:'100%',
        backgroundColor: "white",
        borderRadius: 5,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 5
    }
});

export default CardDisplay;