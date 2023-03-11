import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
/*var sound = require("react-native-sound");
sound.setCategory("playback");*/

export default function App() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    // Create an array of card objects with matching pairs
    const cardValues = ["1", "2", "3", "4", "5", "6", "7", "8"];
    const cardsArray = [];
    for (let i = 0; i < cardValues.length; i++) {
      cardsArray.push({ value: cardValues[i], id: i * 2 });
      cardsArray.push({ value: cardValues[i], id: i * 2 + 1 });
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
    if (selectedCards.length === 1 && selectedCards[0].value === card.value) {
      setMatchedCards([...matchedCards, selectedCards[0].id, card.id]);

      /*let zvuk = new Sound("jedan.mp3", sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log("Failed to load the sound", error);
          return;
        }
      });

      zvuk.play((success) => {
        if (success) {
          console.log("audio playing ended successfully here");
        } else {
          console.log("Playback speed failed by audio decoding error");
        }
      });*/

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

  return (
    <View style={styles.container}>
      <Text style={styles.turnsText}>Tries: {parseInt(turns)}</Text>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4}
        contentContainerStyle={styles.cardsContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  turnsText: {
    fontSize: 24,
    marginBottom: 16,
  },
  cardsContainer: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ddd",
    margin: 4,
    width: 64,
    height: 64,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    fontSize: 24,
  },
  flippedCard: {
    backgroundColor: "#6be876",
  },
  flippedCardText: {
    color: "#fff",
  },
});
