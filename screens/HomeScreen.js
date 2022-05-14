import React, { useLayoutEffect, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Animated,
  TouchableOpacity,

} from "react-native";

import stylesremote from "../styles/styles";

import Svg, { Path } from 'react-native-svg';


const HomeScreen = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

 
  const startAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
 
   setTimeout(() => {
 
     Animated.sequence([
       Animated.timing(
         startAnimation,
         {
           toValue: -600,
           useNativeDriver: true,
         }
       )
 
     ]).start();
 
 
    } ,5000);
   
  },[])
  const startAnimation2 = useRef(new Animated.Value(600)).current;

  useEffect(() => {
 
   setTimeout(() => {
 
     Animated.sequence([
       Animated.timing(
         startAnimation2,
         {
           toValue: 0,
           useNativeDriver: true,
         }
       )
 
     ]).start();
 
 
    } ,5000);
   
  },[])


  const left = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    if (left) {
      Animated.timing( startAnimation2, {
      toValue: -600,
      duration: 200,
      useNativeDriver: true
    }).start();
  } return navigation.replace("Login");
  }

 
  return  (


    
    <View style = {styles.view} >
       <Animated.View 
        style = {{

          position: "absolute",
        
        transform:[ 
         {translateX: startAnimation}
        ] 

        }}>


        <Image
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
        }}
        source={{
          uri: "https://eresearch.areandina.edu.co/discover/file/n226706/AREANDINA.png",
        }}
      />

      
 <ActivityIndicator color = "white"/>
        </Animated.View>




      

      <Animated.View
style = {{ 

  position: "absolute",
  transform: [ 

    {translateX: startAnimation2}
  ]
}}


> 

<TouchableOpacity onPress = {left}> 
<Svg width={100} height = {100 }xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><Path  fill="white"  d ="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z"/></Svg>


</TouchableOpacity>

</Animated.View>

     

       




    </View>

   
   
 
  );
};
const styles = StyleSheet.create(stylesremote);
export default HomeScreen;
