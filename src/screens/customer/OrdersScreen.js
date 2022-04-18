import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import CurrentOrderItem from '../../components/CurrentOrderItem';
import { Colors } from '../../commonconfig';

const OrdersScreen = props => {

    const [state, setState] = useState('current');

    const currentOrders = useSelector( state => state.Order.currentOrders )
    //console.log(currentOrders);  

    const pastOrders = useSelector( state => state.Order.pastOrders)

    return (
        <View style={styles.screen} >

            {/* Current / Past Button */}
            <View style={styles.currentPastButtonContainer}>
                <TouchableOpacity onPress={() => setState('current')} style={{ ...styles.currentPastButton, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, backgroundColor: state === 'current' ? Colors.ORANGE : Colors.WHITE, borderColor: state === 'current' ? Colors.ORANGE : Colors.LIGHTER_GREY }}>
                    <Text style={{...styles.currentPastButtonText, color: state === 'current' ? Colors.WHITE : Colors.LIGHTER_GREY }}>Current Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setState('past')} style={{ ...styles.currentPastButton, borderTopRightRadius: 5, borderBottomRightRadius: 5, backgroundColor: state === 'past' ? Colors.ORANGE : Colors.WHITE, borderColor: state === 'past' ? Colors.ORANGE : Colors.LIGHTER_GREY }}>
                    <Text style={{...styles.currentPastButtonText, color: state === 'past' ? Colors.WHITE : Colors.LIGHTER_GREY }}>Past Orders</Text>
                </TouchableOpacity>
            </View>

            {/* Order List Container */}
            <View style={{flex:10}}>
                <ScrollView>
                    {state === 'current' ? 
                    (
                        <View style={styles.orderItem}>
                            {currentOrders.map( item => {
                                return (
                                    <View key={item.orderID}>
                                        <CurrentOrderItem 
                                            catererId = { item.catererId }
                                            items = { item.items }
                                            orderType = { item.orderType }
                                            orderPlaceTime = { item.orderPlaceTime }
                                            orderPlaceDate = { item.orderPlaceDate }
                                            totalAmount = { item. totalAmount }
                                            orderID = { item.orderID }
                                        />
                                    </View>
                                )
                            } )}
                        </View>
                    ) : (
                        <View style={styles.orderItem}>
                        {pastOrders.map( item => {
                            return (
                                <View key={item.orderID}>
                                    <CurrentOrderItem 
                                        catererId = { item.catererId }
                                        items = { item.items }
                                        orderType = { item.orderType }
                                        orderPlaceTime = { item.orderPlaceTime }
                                        orderPlaceDate = { item.orderPlaceDate }
                                        totalAmount = { item. totalAmount }
                                        orderID = { item.orderID }
                                    />
                                </View>
                            )
                        } )}
                    </View>
                    )}
                </ScrollView>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND_GREY
    },
    orderItem:{
        borderBottomColor: Colors.LIGHTEST_GREY,
        borderBottomWidth: 5, 
        padding: 10
    },
    currentPastButtonContainer: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.WHITE,
        flex: 1,
        shadowColor: Colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
  
    },
    currentPastButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderWidth: 0.5
    },
    currentPastButtonText:{
        fontWeight:'bold',
        fontSize:15
    }
});

export default OrdersScreen;