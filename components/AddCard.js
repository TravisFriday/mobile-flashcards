import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import TouchButton from "./TouchButton";
import { black, white } from "../utils/colors";
import { connect } from "react-redux";
import { addCardToDeck } from "../actions/index";
import { addCardToDeckAS } from "../utils/api";

export class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };
  handleQuestionChange = (question) => {
    this.setState({ question });
  };
  handleAnswerChange = (answer) => {
    this.setState({ answer });
  };
  handleSubmit = () => {
    const { addCardToDeck, title, navigation } = this.props;
    const card = {
      question: this.state.question,
      answer: this.state.answer,
    };

    addCardToDeck(title, card);
    addCardToDeckAS(title, card);

    this.setState({ question: "", answer: "" });
    navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.block}>
            <Text style={styles.title}>Add a question</Text>
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.question}
              onChangeText={this.handleQuestionChange}
              placeholder="Question"
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => this.answerTextInput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.answer}
              onChangeText={this.handleAnswerChange}
              placeholder="Answer"
              ref={(input) => {
                this.answerTextInput = input;
              }}
              returnKeyType="done"
              onSubmitEditing={this.handleSubmit}
            />
          </View>
          <TouchButton
            btnStyle={{
              backgroundColor: black,
              borderColor: white,
              borderRadius: 28,
            }}
            onPress={this.handleSubmit}
            disabled={this.state.question === "" || this.state.answer === ""}
          >
            Submit
          </TouchButton>
        </View>
        <View style={styles.viewspace} />
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
    justifyContent: "space-around",
  },
  block: {
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    borderRadius: 28,
    fontSize: 20,
    height: 40,
    shadowColor: black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
  },
  viewspace: {
    height: "30%",
  },
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam("title", "undefined");

  return {
    title,
  };
};

export default connect(mapStateToProps, { addCardToDeck })(AddCard);
