import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import Caterer from '../../../model/caterer';
import discountCouponsBanners from '../../../model/discountCouponBanners';
import Addresses from '../../../model/addresses';
import HeartIconHome from '../../../components/HeartIconHome';

const windowWidth = Dimensions.get("window").width;

const HomeScreen = props => {

    const activeAddress = Addresses.find(item => {return(item.isActive===true)})

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

    const renderCarouselItem = ({item,index}, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={item}
                    containerStyle={styles.imageContainer}
                    style={styles.imageCarousel}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
            </View>
        );
    }

    return (
        <>
            {/* Address Bar */}
            <View style={{backgroundColor:'#fff', height:60, flexDirection:'row'}}>
                <View style={{flex:0.6, justifyContent:'center',paddingLeft:10}}>
                    <TouchableOpacity onPress={ () => { props.navigation.navigate('SavedAddresses')}}>
                        <Text style={{fontWeight:'600', color:'#777777'}} >My Event Location</Text>
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:12, fontWeight:'bold'}}>{activeAddress.address}</Text>
                            <Ionicon name="caret-down" color="#2EE742" size={15}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                <Carousel
                    sliderWidth={windowWidth}
                    sliderHeight={windowWidth}
                    itemWidth={windowWidth - 60}
                    data={discountCouponsBanners}
                    renderItem={renderCarouselItem}
                    hasParallaxImages={true}
                />

                
                <View style={{alignItems:'center'}}>
                    <View style={{marginVertical:15,flexDirection:'row',width:'90%',alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={{fontSize:20, fontWeight:'bold'}} >Near By Caterers</Text>
                        <TouchableOpacity onPress={ () => { props.navigation.navigate('Sort')}} >
                            <Feather name="filter" size={25} color="black"/>
                        </TouchableOpacity>
                    </View>

                    {Caterer.map(function(c){
                        return ( 
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Details',{catererId: c.id}) }} key={c.id} >
                            <View style={{width: windowWidth * 0.9, height:250, backgroundColor:'#A086D5', marginVertical:5, borderRadius:15,overflow: 'hidden', alignItems:'center'}}>
                                <Image source={{ uri: c.image }} style={styles.image} />
                                <View style={styles.detailContainer}>
                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>{c.name}</Text>
                                        <Text style={{ fontWeight: '800', marginTop: 3 }} >{c.address}</Text>
                                        <Text style={{fontWeight: '800', marginTop: 3 }}>$ {c.price} / Per Dish</Text>
                                        <View style={{ marginTop: 3 }} >
                                            <Stars rating={c.rating} />
                                        </View>
                                    </View>
                                    <HeartIconHome initialState={c.isFavourite}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            
        </>
    );
};

const styles = StyleSheet.create({
    image: { 
        flex: 9, 
        height: 250, 
        width: '100%' 
    },
    detailContainer: { 
        flex: 3, 
        flexDirection: 'row', 
        backgroundColor: 'white', 
        width: '100%', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 20 
    },
    item: {
        width: windowWidth - 60,
        height: 200,
        marginTop:10
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    imageCarousel: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    },
});

export default HomeScreen;