import { StyleSheet, View  } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Input, Button} from "@rneui/base";
import { auth } from "../firebase";


const LoginScreen = ({navigation}) => {


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

 



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signin = ( ) =>  { 
   auth.signInWithEmailAndPassword(email, password)
 
  .catch((error) => {
    
    var errorMessage = error.message;
    alert(errorMessage)
  });
  }
useEffect(() => { 
  const unsubscribe = auth.onAuthStateChanged(function (user) {
    if (user) {
      navigation.replace("Chat")
    } else {
      navigation.canGoBack() && navigation.popToTop();
    }
  });

  return unsubscribe
}, [])



  return (
    
    <View style={styles.container}>
      <Input
        placeholder="Enter your email"
      
        leftIcon={{ type: "material", name: "email" }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Password"
        
        secureTextEntry={true}
        leftIcon={{ type: "material", name: "lock" }}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
   
      <Button  title={"Sign in"} onPress = {signin} style = {styles.button} />
      <Button  title={"Register"} style = {styles.button} onPress ={() => navigation.navigate('Register')} />
     
   
  
    </View>
  );
};







const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    button : {
      
        width: 200,
        marginTop: 35,
    },
  });






export default LoginScreen;
