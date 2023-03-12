import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Button
} from "react-native";

function MyButton(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

//<Image style={styles.image} source={require('../public/waffle.png')} />
export default function HomeScreen({ navigation }) {
  return (
   
    <View style={{ flex: 1,  }}>
       <ImageBackground  
        source={require('../public/4000.jpg')}
        style={styles.imageBg}
        imageStyle= {{opacity:0.2}}
      >
       <Image style={styles.image} source={require('../public/logo.png')} />
      <MyButton 
        title="Continue level"
        onPress={() => navigation.navigate("Play")}
      />
      <MyButton
        title="Change level"
        onPress={() => navigation.navigate("Level")}
      />
      </ImageBackground>
    </View>
  );
}


 const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    height: 90,
    width: 300,
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: '#c75f00',
    mixBlendMode: 'normal',
    borderWidth: 5,
    borderColor: '#6b2b05',
    borderRadius: 20,
    
  },
  buttonText: { 
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'medium',
   
  },
  image:{
    width: '59%',
    height: '20%',
    marginBottom: 30,
    marginTop: 10,
    alignSelf: 'center',
    opacity:1,
  },
  imageBg: {
    flex: 1,
   justifyContent: 'flex-end',
   paddingBottom: '60%',
  },
});
