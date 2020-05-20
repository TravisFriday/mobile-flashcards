import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import Deck from "./Deck";
import { black, white } from "../utils/colors";
import { handleInitialData } from "../actions/index";

export class DeckList extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { decks, navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Flashcards</Text>
        {Object.values(decks).map((deck) => {
          return (
            <TouchableOpacity
              key={deck.title}
              onPress={() =>
                navigation.navigate("DeckDetail", { title: deck.title })
              }
            >
              <Deck id={deck.title} />
            </TouchableOpacity>
          );
        })}
        <View style={{ marginBottom: 30 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: white,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 16,
    color: black,
  },
});

const mapStateToProps = (state) => ({ decks: state });

export default connect(mapStateToProps, { handleInitialData })(DeckList);
