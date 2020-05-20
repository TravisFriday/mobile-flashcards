import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Deck from "./Deck";
import TouchButton from "./TouchButton";

import { white, red, black } from "../utils/colors";
import { connect } from "react-redux";
import { removeDeck } from "../actions/index";
import { removeDeckAS } from "../utils/api";

export class DeckDetail extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  handleDelete = (id) => {
    const { removeDeck, navigation } = this.props;

    removeDeck(id);
    removeDeckAS(id);

    navigation.goBack();
  };
  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <Deck id={deck.title} />
        <View>
          <TouchButton
            btnStyle={[
              {
                backgroundColor: black,
                borderColor: white,
                borderRadius: 30,
              },
              styles.button,
            ]}
            txtStyle={{ color: white }}
            onPress={() =>
              this.props.navigation.navigate("Quiz", { title: deck.title })
            }
          >
            Start Quiz
          </TouchButton>
          <TouchButton
            btnStyle={[
              {
                backgroundColor: white,
                borderColor: black,
                borderRadius: 30,
              },
              styles.button,
            ]}
            txtStyle={{ color: black }}
            onPress={() =>
              this.props.navigation.navigate("AddCard", { title: deck.title })
            }
          >
            Add Card
          </TouchButton>

          <TouchButton
            btnStyle={[
              {
                backgroundColor: white,
                borderColor: red,
                borderRadius: 30,
                borderWidth: 2,
              },
              styles.button,
            ]}
            txtStyle={{ color: red }}
            onPress={() => this.handleDelete(deck.title)}
          >
            Delete Deck
          </TouchButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: white,
  },
  button: {
    borderRadius: 30,
    borderWidth: 2,
  },
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam("title", "undefined");
  const deck = state[title];

  return {
    deck,
  };
};

export default connect(mapStateToProps, { removeDeck })(DeckDetail);
