import React, {useState} from "react";
import { Button,TouchableOpacity  ,TextInput ,View,StyleSheet, ImageBackground,Text } from "react-native";



function MyButton(props) {
    return (
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableOpacity>
    );
  }
 

export default function LoginScreen({ navigation }) {

    const [text, setText] = useState('');

    const handleInputChange = (inputValue) => {
      setText(inputValue);
    };
  return (
    <View style={{ flex: 1 }}>
         <ImageBackground  
        source={require('../public/pozz.png')}
        style={styles.imageBg}
        imageStyle= {{opacity:0.2}}
      >
      <View  style={styles.box}>
      <ImageBackground  
        source={require('../public/LavicLogin.png')}
        style={styles.imageLavic}
        imageStyle= {{opacity:1}}
      > 
       <TextInput
        
      style={styles.txt }
      marginTop={"55%"}

      onChangeText={handleInputChange}
      value={text}
      placeholder="Type name here..."
    />
     <TextInput
      style={styles.txt}
      
      onChangeText={handleInputChange}
      value={text}
      placeholder="Type password here..."
    />
         <MyButton 
        title="Log in"
        onPress={() => navigation.navigate("Home")}
      />
      </ImageBackground>
      </View>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
    txt:{
      borderColor: 'brown',
      borderWidth: 2,
      height: 50,
      width: 200,
      paddingLeft:10,
      marginBottom:10,
     marginLeft:'-15%',
     borderRadius: 15,
     backgroundColor: 'rgba(255, 255, 255, 0.7)',
     
    },
    box:{ 
       
    height:600,
       width : '100%',
      alignSelf:'center',
      justifyContent: 'center',
    },
    button: {
      borderRadius: 25,
      justifyContent: 'center',
      height: 40,
      width: 150,
      marginBottom: 20,
      alignSelf: 'center',
      backgroundColor: '#c75f00',
      mixBlendMode: 'normal',
      borderWidth: 5,
      borderColor: '#6b2b05',
      borderRadius: 20,
      marginLeft:'-15%'
          
    },
    buttonDISS: {
        padding: 0,
        borderRadius: 25,
        justifyContent: 'center',
        position: 'relative',
        height: 90,
        width: 300,
        marginBottom: 20,
        alignSelf: 'center',
        backgroundColor: '#41982B',
        mixBlendMode: 'normal',
        borderWidth: 5,
        borderColor: '#19680C',
        borderRadius: 20,
            
      },
    buttonText: { 
      textAlign: 'center',
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: 'medium',
     
    },
    buttonTextDISS: { 
        textAlign: 'center',
        color: '#6B7672',
        fontSize: 15,
        fontWeight: 'medium',
        zIndex: 0,
        marginTop:20,
       
      },
      imageLavic: {
        position: 'absolute',
        alignItems:'center',
        height: '80%',
        width: '85%',
       marginLeft:'13%',  
      },
    image:{
      width: 120,
      height: 120,
      marginBottom: 30,
      marginTop: 10,
      alignSelf: 'center',
      alignItems: 'center',
      opacity:1,
    },
    lock:{
        width: 50,
        height: 60,
        marginBottom: 5,
        marginTop: '3%',
        alignSelf: 'center',
        opacity:.6,
        zIndex: 1,
      },
    imageBg: {
      flex: 1,
     justifyContent: 'flex-start',
     paddingTop: '40%'
    },
    scrl: {
        height: 200,
    }
  });
  