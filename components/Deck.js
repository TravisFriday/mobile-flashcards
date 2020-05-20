import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { white, textGray } from "../utils/colors";
import { connect } from "react-redux";

const Deck = (props) => {
  const { deck } = props;

  if (deck === undefined) {
    return <View style={styles.deckContainer} />;
  }
  return (
    <View style={styles.deckContainer}>
      <View>
        <Text style={styles.deckText}>{deck.title}</Text>
      </View>
      <View>
        <Text style={styles.cardText}>
          {deck.questions.length}{" "}
          {deck.questions.length !== 1 ? "Cards" : "Card"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deckContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 120,
    minHeight: 120,
    backgroundColor: white,
    borderWidth: 1,
    shadowRadius: 0.1,
    elevation: 5,
    borderRadius: 10,
    borderColor: "gray",
    marginBottom: 10,
  },
  deckText: {
    fontSize: 28,
  },
  cardText: {
    fontSize: 18,
    color: textGray,
  },
});

const mapStateToProps = (state, { id }) => {
  const deck = state[id];

  return {
    deck,
  };
};

export default connect(mapStateToProps)(Deck);
