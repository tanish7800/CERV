import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'; 
import Ionicon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Caterer from '../../../model/caterer';
import Colors from '../../../constants/Colors';

const DetailScreen = props => {

    const catererId = props.route.params.catererId;
    const selectedCaterer = Caterer.find(caterer => { return(caterer.id === catererId) });

    // Caterer Rating Logic
    const Stars = props => {
        let rating = props.rating;
        let disp = []

        for (var i = 1; i <= 5; i++) {
            let star = <Ionicon name="star" size={18} color="#F0E010" key={i}/>
            if (i > rating) {
                star = <Ionicon name="star-outline" size={18} color="grey" key={i}/>
            }
            disp.push(star);
        }

        return (<View style={{ flexDirection: 'row' }} >{disp}</View>)
    }

    // PlaceHolder Date Time 
    const dummyDateTimeObject = new Date("2022-01-01");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [month, day, year] = [dummyDateTimeObject.getMonth(), dummyDateTimeObject.getDate(), dummyDateTimeObject.getFullYear()];
    const [hour, minutes] = [dummyDateTimeObject.getHours(), dummyDateTimeObject.getMinutes()];
    const ampm = hour>=12 ? 'PM' : 'AM'
    const dateString = day + " " + monthNames[month] + " " + year;
    const timeString = (hour%12) + ":" + minutes + " " +ampm
    
    // Date Picker Logic
    const [initialDate, setInitialDate] = useState(dateString);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const showDatePicker = () => {
        setIsDatePickerVisible(true);
    };
    const hideDatePicker = () => {
        setIsDatePickerVisible(false);
    };
    const handleConfirm = (date) => {
        const [month, day, year]  = [date.getMonth(), date.getDate(), date.getFullYear()];
        const selectedDateStr = day + " " + monthNames[month] + " " + year;
        setInitialDate( selectedDateStr );
        hideDatePicker();
    };

    // Time Picker Logic
    const [initialTime, setInitialTime] = useState(timeString);
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
    const showTimePicker = () => {
        setIsTimePickerVisible(true);
    };
    const hideTimePicker = () => {
        setIsTimePickerVisible(false);
    };
    const handleTimeConfirm = (date) => {
        const [hour, minutes] = [date.getHours(), (date.getMinutes()<10?'0':'') + date.getMinutes()];
        const ampm = hour>=12 ? 'PM' : 'AM'
        const selectedTimeStr = (hour%12) + ":" + minutes + " " +ampm;
        setInitialTime(selectedTimeStr)
        hideTimePicker();
    };

    // Delivery Type Logic
    const [deliverySelected, setDeliverySelected] = useState(false);
    const [orderSelected, setOrderSelected] = useState(false);

    const deliverySelectHandler = () => {
        setDeliverySelected(!deliverySelected);
        setOrderSelected(false);
    }

    const orderSelectHandler = () => {
        setOrderSelected(!orderSelected);
        setDeliverySelected(false)
    }


    // Rendering Menu
    const menuArray = Object.keys(selectedCaterer.categories);
    const [activeMenuItem, setActiveMenuItem] = useState(menuArray[0]);

    const menuItemClickHandler = (val) => {
        setActiveMenuItem(val)
    }

    const dishes = activeMenuItem ? selectedCaterer.categories[activeMenuItem] : selectedCaterer.categories[menuArray[0]]

    // Cart Logic
    //

    return (
        <View style={{flex:1}}>
            <View style={{flex:0.93}}>
            <ScrollView>
                {/* Caterer Details */}
                <View style={styles.screen}>
                    <Image source={{uri:selectedCaterer.image}} style={styles.image}/>
                    <Text style={styles.name}>{selectedCaterer.name}</Text>
                    <Text style={styles.address}>{selectedCaterer.address}</Text>
                    <View style={{ marginTop: 3 }} >
                        <Stars rating={selectedCaterer.rating} />
                    </View>
                </View>

                {/* Date & Time */}
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.label}>Date and Time</Text>
                    <View style={{flexDirection:'row',width:'100%',height:60, justifyContent:'space-between',alignItems:'center', marginVertical:10}}>

                        <TouchableOpacity onPress={showDatePicker} style={{width:'48%'}}>
                            <View style={styles.dateTimeModalContainer}>
                                <Text style={styles.timeDate}>{initialDate}</Text>
                                <Ionicon name="calendar" size={30} color={Colors.orange}/>
                            </View>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={showTimePicker} style={{width:'48%'}}>
                            <View style={styles.dateTimeModalContainer}>
                                <Text style={styles.timeDate}>{initialTime}</Text>
                                <Ionicon name="time-outline" size={30} color={Colors.orange}/>
                            </View>
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleTimeConfirm}
                                onCancel={hideTimePicker}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Category, Bio */}
                <View style={styles.screen}>
                    <View style={styles.food_category}>
                        <Text style={styles.label}>Food Category</Text>
                        <Text style={{marginTop:10, color:'black', fontWeight:'bold', fontSize:18}}>{selectedCaterer.food_category}</Text>
                    </View>
                    <Text style={styles.label}>Bio</Text>
                    <Text style={{marginTop:10, color:'black', fontWeight:'bold', fontSize:18}}>{selectedCaterer.bio}</Text>
                </View>

                {/* Order Type */}
                <View style={styles.orderTypeContainer}>
                    <Text style={styles.label} >Order Type</Text>
                    
                    {/* Options */}
                    <View style={styles.optionContainer}>
                        
                        {/* Delivery */}
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity onPress={deliverySelectHandler} >
                                {deliverySelected ? <Ionicon name="radio-button-on-outline" size={25} color={Colors.orange}/>:<Ionicon name="radio-button-off-outline" size={25} color={Colors.grey}/>}
                            </TouchableOpacity>
                            <Text style={styles.orderTypeLabel}>Delivery</Text>
                        </View>
                        {/* Pick Up */}
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity onPress={orderSelectHandler} >
                                {orderSelected ? <Ionicon name="radio-button-on-outline" size={25} color={Colors.orange}/>:<Ionicon name="radio-button-off-outline" size={25} color={Colors.grey}/>}
                            </TouchableOpacity>
                            <Text style={styles.orderTypeLabel}>Pick Up</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Module */}
                <View style={styles.menu}>

                    {/* Category of items */}
                    <Text style={styles.menuTitle}>Menu</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginBottom:30}}>
                        {menuArray.map(menuItem => {
                            return (
                                <TouchableOpacity onPress={ () => menuItemClickHandler(menuItem) } >
                                    <View key={menuItem} style={{...styles.categoryItem,backgroundColor:activeMenuItem===menuItem? '#E96739':'#eee'}}>
                                        <Text style={{...styles.categoryItemTitle,color: activeMenuItem === menuItem ? "white" : "black" }}>{menuItem}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>

                    {/* Dishes in selected category */}
                    <Text style={styles.menuTitle}>Dishes</Text>
                    {dishes.map(dish =>{
                        return(
                            <View style={styles.dishItemContainer}>
                                <Image source={{uri: dish.image}} style={styles.dishImage}/>
                                <View style={styles.dishTextContainer}>
                                    <Text style={styles.dishName}>{dish.name}</Text>
                                    <Text style={styles.dishDesc} numberOfLines={2} ellipsizeMode='tail'>{dish.description}</Text> 
                                    <View style={{flexDirection:'row', justifyContent:'space-between',margin:2, marginTop:10}}>
                                        <Text>${dish.price}</Text>
                                        
                                        <View style={styles.dishCartButton}>
                                            <TouchableOpacity onPress={() =>{}} ><Ionicon name="remove-outline" size={20} color="red"/></TouchableOpacity>
                                            <Text>Qty</Text>
                                            <TouchableOpacity onPress={() =>{}}><Ionicon name="add-outline" size={20} color="green"/></TouchableOpacity>
                                        </View>
                                        
                                        <TouchableOpacity onPress={ () => {}}>
                                            <View style={styles.dishCartButton}>
                                                <Ionicon name="cart-outline" size={20} color={Colors.orange}/>
                                                <Text>Add</Text>
                                            </View>
                                        </TouchableOpacity>
                                        
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
                

            </ScrollView>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
                <View style={styles.footerButton}>
                    <Text style={styles.footerText}>Item Total: $ DUMMY</Text>
                </View>
                <View style={{width:0, height:'100%', borderColor:'white', borderWidth:1}}></View>
                <View style={styles.footerButton}>
                    <TouchableOpacity onPress={ () => {}}>
                        <Text style={styles.footerText}>MAKE PAYMENT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        paddingHorizontal:20,
        paddingVertical:20,
        borderBottomColor:'#ddd',
        borderBottomWidth:1
    },
    image:{
        height:200, 
        width:'100%',
        borderRadius:10
    },
    label:{
        fontWeight:'bold',
        fontSize:17,
        color:'#aaa'
    },
    name:{
        fontWeight:'bold',
        fontSize:20,
        marginTop:10
    },
    address:{
        fontWeight:'bold',
        fontSize:17,
        color:'#444',
        marginTop:5
    },
    dateTimeContainer:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
        height:110
    },
    dateTimeModalContainer:{ 
        flex:1,
        borderColor:'#ccc', 
        borderWidth:1, 
        flexDirection:'row',
        alignItems:'center', 
        justifyContent:'space-between', 
        paddingHorizontal:10,
        borderRadius:10
    },
    food_category:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        paddingBottom:10,
        marginBottom:5
    },
    timeDate:{
        color:'black', 
        fontWeight:'bold', 
        fontSize:18
    },
    orderTypeContainer:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
    },
    orderTypeLabel:{
        color:'black',
        fontSize:20,
        fontWeight:'900'
    },
    optionContainer:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
        paddingHorizontal:30,
        paddingTop:10
    },
    menu:{
        padding:10,
    },
    menuTitle:{
        color:'black',
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10
    },
    categoryItem:{
        height:40, 
        borderRadius:20, 
        borderColor:'#ccc', 
        borderWidth:1, 
        marginHorizontal:5,
        alignItems:'center', 
        justifyContent:'center', 
    },
    categoryItemTitle:{
        marginHorizontal:30, 
        fontWeight:'bold', 
        fontSize:15,
        letterSpacing:-0.5
    },
    dishItemContainer:{
        flexDirection:'row', 
        alignItems:'center', 
        marginBottom:10, 
        marginTop:5, 
        borderBottomColor:'#ccc', 
        borderBottomWidth:1, 
        padding:15
    },
    dishTextContainer:{
        flex:2 , 
        justifyContent:'space-evenly', 
        padding:10, 
        marginLeft:10
    },
    dishImage:{
        flex:1,
        height:100, 
        width:100
    },
    dishName:{
        width:'100%',
        margin:2,
        fontWeight:'bold'
    },
    dishDesc:{
        width:'100%',
        margin:2, 
        color:'#777' 
    },
    dishCartButton:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
        borderColor:'#ccc', 
        borderWidth:1,
        paddingHorizontal:10, 
        height:30, 
        borderRadius:10
    },
    footerContainer:{
        flex:0.07,
        width:'100%', 
        backgroundColor: Colors.orange,
        marginTop:10, 
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center'
    },
    footerButton:{
        flex:1, 
        alignItems:'center'
    },
    footerText:{
        fontWeight:'bold',
        color:'white',
        fontSize:18
    }
});

export default DetailScreen;