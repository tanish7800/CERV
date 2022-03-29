import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Colors from '../constants/Colors';

const AddressItem = props => {

    const [isActive, setIsActive] = useState(props.isActive);

    return (
        <View style={styles.container} >
            <Grid>
                {/* Text */}
                <Col>
                    <Row style={{height:50}} ><Text style={{fontWeight:'bold', fontSize:25}} >{props.tag}</Text></Row>
                    <Row style={{height:30,marginTop:-10}}><Text style={{fontWeight:'600', fontSize:14}} >{props.address}</Text></Row>
                </Col>
                {/* Radio Button */}
                <Col style={{width:'10%',alignItems:'center',justifyContent:'center'}} >
                    <TouchableOpacity onPress={ () => setIsActive(!isActive) } >
                        {isActive ? <Ionicon name="radio-button-on-outline" size={25} color={Colors.orange}/> : <Ionicon name="radio-button-off-outline" size={25} color={Colors.grey}/>}
                    </TouchableOpacity>
                </Col>
            </Grid>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between', 
        borderBottomColor:Colors.grey,
        borderBottomWidth:1, 
        flex:1, 
        height:100, 
        alignItems:'center',  
        marginHorizontal:10,
        width: Dimensions.get('window').width *0.85
    },
});

export default AddressItem;