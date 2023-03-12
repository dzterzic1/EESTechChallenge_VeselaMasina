import React, { useState, useEffect } from "react";
import { ImageBackground } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  ScrollView,
  Image,
  Button,
  SafeAreaView,
} from "react-native";

const cardValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const cardNames = [
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
  "SIX",
  "SEVEN",
  "EIGHT",
  "NINE",
  "TEN",
];

function firstNValues(n) {
  return cardValues.slice(0, n);
}

function firstNNames(n) {
  return cardNames.slice(0, n);
}

const App = ({ route }) => {
  const { height, width } = route.params;
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const stars = [
    {
      id: "1",
      title: "prazna",
    },
    {
      id: "2",
      title: "prazna",
    },
    {
      id: "3",
      title: "prazna",
    },
  ];

  useEffect(() => {
    // Create an array of card objects with matching pairs
    const cardValues = firstNValues((height * width) / 2);
    const cardNames = firstNNames((height * width) / 2);
    const cardsArray = [];
    for (let i = 0; i < cardValues.length; i++) {
      cardsArray.push({ value: cardValues[i], id: i });
    }
    for (
      let i = (height * width) / 2;
      i < (height * width) / 2 + cardValues.length;
      i++
    ) {
      cardsArray.push({ value: cardNames[i - (height * width) / 2], id: i });
    }

    // Shuffle the cards
    const shuffledCards = cardsArray.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, []);

  const handleCardPress = (card) => {
    if (selectedCards.length === 2 || matchedCards.includes(card.id)) {
      return;
    }
    setSelectedCards([...selectedCards, card]);
    if (
      selectedCards.length === 1 &&
      Math.abs(selectedCards[0].id - card.id) == (height * width) / 2
    ) {
      setMatchedCards([...matchedCards, selectedCards[0].id, card.id]);
      //console.log(matchedCards.length);
      console.log("matchane");
      console.log(matchedCards.length);
      if (matchedCards.length == 2 * ((height * width - 1) / 2)) {
        setShowPopup(true);
      }
      if (matchedCards.length == 2 * (2, (height * width - 2) / 2)) {
        setModalVisible(true);
      }
      setSelectedCards([]);
    } else if (selectedCards.length === 1) {
      setTimeout(() => {
        setSelectedCards([]);
      }, 1000);
    }
    setTurns(turns + 0.5);
  };

  const renderCard = ({ item }) => {
    const isFlipped =
      selectedCards.includes(item) || matchedCards.includes(item.id);
    return (
      <TouchableOpacity
        style={[styles.card, isFlipped && styles.flippedCard]}
        onPress={() => handleCardPress(item)}
        disabled={matchedCards.includes(item.id)}
      >
        <Text style={[styles.cardText, isFlipped && styles.flippedCardText]}>
          {isFlipped ? item.value : "?"}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderStar = ({ item }) => {
    if (turns <= 40 && item.id == 1) {
      return (
        <Image style={styles.star} source={require("../assets/zuta.png")} />
      );
    } else if (item.id == 1) {
      return (
        <Image style={styles.star} source={require("../assets/prazna.png")} />
      );
    }
    if (parseInt(turns) <= 25 && item.id == 2) {
      return (
        <Image style={styles.star} source={require("../assets/zuta.png")} />
      );
    } else if (item.id == 2) {
      return (
        <Image style={styles.star} source={require("../assets/prazna.png")} />
      );
    }
    if (parseInt(turns) <= 20 && item.id == 3) {
      return (
        <Image style={styles.star} source={require("../assets/zuta.png")} />
      );
    } else if (item.id == 3) {
      return (
        <Image style={styles.star} source={require("../assets/prazna.png")} />
      );
    }
  };
  function MyButton(props) {
    return (
      <TouchableOpacity style={styles.close} onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../public/pozzSaLavicem.png")}
        style={styles.imageBg}
        imageStyle={{ opacity: 0.2 }}
      >
        <Text style={styles.turnsText}>Tries counter: {parseInt(turns)}</Text>
        <Modal visible={showPopup} animationType="fade" transparent={true}>
          <View style={styles.popup}>
            <Image
              style={{ height: 30, width: 32, alignSelf: "center" }}
              source={require("../assets/zuta.png")}
            />
            <Text style={styles.popupText}>
              You are doing great, keep going
            </Text>
            <MyButton title="Close" onPress={handlePopupClose} />
          </View>
        </Modal>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTextHead}>Congratulations</Text>
                <Text style={styles.modalText}>
                  You have successfully passed this level
                </Text>
                <SafeAreaView style={styles.stars}>
                  <FlatList
                    contentContainerStyle={{
                      flexGrow: 1,
                      justifyContent: "space-evenly",
                    }}
                    data={stars}
                    renderItem={renderStar}
                    horizontal={true}
                    keyExtractor={(item) => item.id}
                  />
                </SafeAreaView>
                <Text style={styles.modalText}>
                  Number of tries: {parseInt(turns)}
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={{ color: "white" }}>Next Level</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <FlatList
          style={{ alignSelf: "center", backgroundColor: "transparent" }}
          data={cards}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={height}
          contentContainerStyle={styles.cardsContainer}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  turnsText: {
    fontSize: 24,
    marginBottom: 16,
    alignSelf: "center",
    marginTop: "20%",
  },
  cardsContainer: {
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#c75f00",
    borderWidth: 5,
    borderColor: "#6b2b05",
    padding: 10,
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#FD984A",
    margin: 4,
    width: 72,
    height: 72,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  imageBg: {
    flex: 1,

    paddingTop: "30%",
  },
  cardText: {
    fontSize: 20,
  },
  flippedCard: {
    backgroundColor: "purple",
  },
  flippedCardText: {
    color: "#fff",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalTextHead: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  star: {
    height: 30,
    width: 32,
  },
  stars: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignSelf: "center",
    position: "absolute",
    top: "40%",
  },
  popupText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  close: {
    borderRadius: 25,
    justifyContent: "center",
    height: 50,
    width: 200,
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "#c75f00",
    borderWidth: 5,
    borderColor: "#6b2b05",
    mixBlendMode: "normal",
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "medium",
  },
});

export default App;
