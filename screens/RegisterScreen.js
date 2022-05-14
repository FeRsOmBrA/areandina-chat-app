import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import { Input, Button } from "@rneui/base";
import { auth } from "../firebase";


const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [imageURL, setImageUrl] = useState("");
  const [password, setPassword] = useState("");

const register = () => {
  auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    user.updateProfile({
      displayName: name,
      photoURL: imageURL? imageURL : "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
    }).then(() => {
      // Update successful
      // ...
    })
    navigation.popToTop();
    // ...
  })
  .catch((error) => {

    var errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
}

  return (
    <View style={styles.container}>
      
      <Input
        placeholder="Enter your name"
        label="Name"
        leftIcon={{ type: "material", name: "account-circle" }}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Input
        placeholder="Enter your email"
        label="Email"
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
      <Input
        placeholder="Enter your image url"
        label="Profile Picture"
        leftIcon={{ type: "material", name: "face" }}
        value={imageURL}
        onChangeText={(text) => setImageUrl(text)}
      />
      <Button title={"Sign in"} style={styles.button} />
      <Button title={"Register"} onPress={register} style={styles.button} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});

export default RegisterScreen;
