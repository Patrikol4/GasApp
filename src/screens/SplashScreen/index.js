import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import SplashImage from '../../assets/Splash.png';

const style = StyleSheet.create({
  bg:{
    flex: 1,
  },

});



const Splash = () => {
  return  <ImageBackground style={style.bg} source ={SplashImage }/>

  
};


export default Splash;