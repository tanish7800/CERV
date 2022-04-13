import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import PaymentOption from "../../../../components/PaymentOption";
import{ Colors }from '../../../../commonconfig';
import paymentOptions from "../../../../model/paymentOptions";

const SavedCards = props => {
    return(
        <View style={styles.screen} > 
            <View style={styles.cardTextContainer}>
                <Text style={styles.label}>Saved Payment Methods</Text>   
            </View>

            {paymentOptions.map( item => {
                return (
                    <View key={item.pid}>
                    { item.paymentType === 'card' ?
                        <PaymentOption 
                            logo={item.logo}
                            mainText={item.cardNumber}
                            subText={item.expiryDate}
                            paymentType = {item.paymentType}
                            selectable
                            onEditPress = { () => {} }
                            onCheckPress = { () => {} }
                        />
                        :
                        <PaymentOption 
                            logo={item.logo}
                            mainText={item.type}
                            subText={item.id}
                            paymentType = {item.paymentType}
                            selectable
                            onEditPress = { () => {} }
                            onCheckPress = { () => {} }
                        />
                    }
                    </View>
                )
            })}

        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:20
    },
    iconContainer:{
        flex:0.5, 
        alignItems:'center', 
        justifyContent:'center'
    },
    logo:{
        flex:0.9,
        maxHeight: 80,
        maxWidth: 80
    },
    cardTextContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:10,
    },
    label:{
        fontWeight:'bold',
        color: Colors.GREY,
        fontSize: 20
    },
    addCard:{
        fontWeight:'bold',
        color: Colors.ORANGE,
        fontSize: 15
    },
    cardItemContainer:{
        flexDirection:'row',
        paddingVertical:10,
        paddingHorizontal:15,
        marginVertical:5,
        alignItems:'center',
        justifyContent:'space-between',
        borderWidth:0.5,
        borderRadius:5,
        borderColor: Colors.GREY
    },
    cardDetailContainer:{
        flex:2,
        justifyContent:'space-evenly',
        alignItems:'flex-start',
        marginLeft:15
    },
    cardMain:{
        fontSize:18,
        fontWeight:'bold',
        marginRight:10
    },
    cardText:{
        color: Colors.GREY,
        fontWeight:'bold'
    }
});

export default SavedCards;