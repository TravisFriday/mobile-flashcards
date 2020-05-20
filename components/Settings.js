import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { white, red, black } from "../utils/colors";
import TouchButton from "./TouchButton";
import { resetDecks } from "../utils/api.js";
import { connect } from "react-redux";
import { resetStore } from "../actions/index";

export class Settings extends Component {
  handleResetDecks = () => {
    const { resetStore, navigation } = this.props;

    resetStore();
    resetDecks();
    navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Reset Data</Text>
        <View style={styles.block}>
          <View style={styles.blockContainer}>
            <Text style={styles.blockText}>
              Are you sure you want to reset data back to original?
            </Text>
            <View style={{ height: 20 }} />
          </View>
          <TouchButton
            btnStyle={[
              {
                marginTop: 30,
                backgroundColor: white,
                borderColor: red,
                borderRadius: 30,
                borderWidth: 2,
              },
              styles.button,
            ]}
            txtStyle={{ color: red }}
            onPress={this.handleResetDecks}
          >
            Reset
          </TouchButton>
        </View>
      </View>
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
  block: {
    marginBottom: 20,
  },
  blockContainer: {
    shadowColor: black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: white,
    borderRadius: 5,
    paddingTop: 40,
    paddingBottom: 30,
    paddingRight: 30,
    paddingLeft: 30,
  },
  blockText: {
    fontSize: 18,
    color: black,
  },
});

export default connect(null, { resetStore })(Settings);
