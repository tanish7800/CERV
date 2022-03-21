import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../constants/Colors';

const SignInScreen = props => {

    const [data, setData] = useState({
        email:'',
        password:'',
        check_textInputChange: false,
        secureTextEntry: true
    });

    const textInputChange = (val) => {
        if(val.length!== 0){
            setData({
                ...data,
                email:val,
                check_textInputChange:true
            })
        } else {
            setData({
                ...data,
                email:val,
                check_textInputChange: false
            })
        }
    };

    const passwordChangeHandle = (val) => {
        setData({
            ...data,
            password:val
        })
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    return(
        <>
        <SafeAreaView style={{flex:0,backgroundColor:Colors.orange}}/>
        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
        <KeyboardAwareScrollView>
        <View style={styles.container} >
            <StatusBar backgroundColor='#009387' barStyle='light-content'/>
            <View style={styles.header} >
                <TouchableOpacity onPress={() => props.navigation.goBack()} >
                    <View style={{marginVertical:10}} >
                        <Ionicon name="arrow-back-outline" size={35} color="white"/>
                    </View>
                </TouchableOpacity>
                <Text style={styles.text_header} >Welcome</Text>
                <Text style={styles.headerText}>Are you a chef, do catering?</Text>
                <Text style={styles.headerText}>Are you looking for a caterer</Text>
                <Text style={styles.headerText}>for an event ?</Text>
                <Text style={styles.headerText}>Login or Register Now.</Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.footerTitle}>Login</Text>
                <Text style={styles.footerText}>Login to your account or Register below</Text>
                <Text style={styles.text_footer} >Email</Text>
                <View style={styles.action} >
                    <FontAwesome name="envelope" color={Colors.orange} size={20}/>
                    <TextInput 
                        placeholder='Your E-mail' 
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        />
                    {data.check_textInputChange ? <Animatable.View animation="bounceIn" ><Feather name="check-circle" color="green" size={20}/></Animatable.View> : null }
                </View>
                
                <Text style={[styles.text_footer,{marginTop:35}]} >Password</Text>
                <View style={styles.action} >
                    <FontAwesome name="lock" color={Colors.orange} size={20}/>
                    <TextInput 
                        placeholder='Your Password'
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => passwordChangeHandle(val) }
                        />
                    <TouchableOpacity onPress={ updateSecureTextEntry }>
                        {data.secureTextEntry ? <Feather name="eye-off" color="grey" size={20}/> : <Feather name="eye" color="grey" size={20}/>}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{}}>
                    <Text style={styles.forgotPassword} > Forgot Password ? </Text>
                </TouchableOpacity>

                {/* LOGIN */}
                <View style={styles.button}>
                    <View style={styles.signIn}>
                        <Text style={[styles.textSign,{color:'#fff'}]} >Login</Text>
                    </View>
                </View>

                <View style={{alignItems:'center'}} >
                    <View style={{flexDirection: 'row', alignItems: 'center',marginVertical:25,width:'65%'}}>
                        <View style={{flex: 1, height: 1, backgroundColor: Colors.grey}} />
                        <View>
                            <Text style={{width: 50, textAlign: 'center',color:Colors.grey}}>OR</Text>
                        </View>
                        <View style={{flex: 1, height: 1, backgroundColor: Colors.grey}} />
                    </View>
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate('SignUpScreen')} >
                    <View style={{alignItems:'center'}} >
                        <Text style={styles.signUp} >Don't have an Account? <Text style={styles.register}>Register</Text></Text>
                    </View>
                </TouchableOpacity>

            </Animatable.View>
        </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: Colors.orange,
    },
    header:{
        flex:1,
        justifyContent:'flex-end',
        paddingBottom:50,
        paddingHorizontal:20
    },
    footer:{
        flex:3,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30
    },
    text_header:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:30
    },
    text_footer:{
        color:'#05375a',
        fontSize:18,
        fontWeight:'bold'
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:Colors.grey,
        paddingBottom: 10
    },
    textInput:{
       flex:1,
       paddingLeft:10,
       color:'#05375a',
       marginLeft:5
    },
    button:{
        alignItems:'center',
        marginTop: 50,
    },
    signIn:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor: Colors.orange
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold'
    },
    headerText:{
        color:'white',
        fontSize:15
    },
    forgotPassword:{
        textAlign:'right',
        marginTop: 15,
        fontSize:15
    },
    footerTitle:{
        fontWeight:'bold',
        fontSize:30,
        marginTop:10
    },
    footerText:{
        fontSize:18,
        marginTop:5,
        marginBottom:40,
        color: Colors.grey
    },
    signUp:{
        fontSize:18,
        color:'#131211'
    },
    register:{
        fontWeight:'bold'
    }
});

export default SignInScreen;