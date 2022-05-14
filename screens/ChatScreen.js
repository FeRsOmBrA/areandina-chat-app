import React, {
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { View, Text, Button } from "react-native";
import { auth, db } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "@rneui/base";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
const ChatScreen = ({ navigation }) => {

 
 
  const [messages, setMessages] = useState([]);


  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];

    db.collection("chats").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={signOut} style={{ marginRight: 25 }}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  };
 

  return (
    <GiftedChat
      showAvatarForEveryMessage={true}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    
      quickReplyTextStyle={{
        fontWeight: '200',
      }}
      timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
      infiniteScroll
      
      onPressAvatar={(user) =>  {
      const username = user.name
      alert(username)
      
      
      }}
   
    />
  );
};

export default ChatScreen;
