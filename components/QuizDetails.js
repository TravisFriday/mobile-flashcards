import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import TextButton from "./TextButton";
import TouchButton from "./TouchButton";
import { green, red, white, black } from "../utils/colors";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import Sad from "../assets/sad.png";
import Happy from "../assets/happy2.png";

const screen = {
  QUESTION: "question",
  ANSWER: "answer",
  RESULT: "result",
};
const answer = {
  CORRECT: "correct",
  INCORRECT: "incorrect",
};
const SCREEN_WIDTH = Dimensions.get("window").width;

class QuizDetails extends Component {
  state = {
    show: screen.QUESTION,
    correct: 0,
    incorrect: 0,
    questionCount: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0),
  };
  handleScroll = () => {
    this.setState({
      show: screen.QUESTION,
    });
  };
  handleAnswer = (response, page) => {
    if (response === answer.CORRECT) {
      this.setState((prevState) => ({ correct: prevState.correct + 1 }));
    } else {
      this.setState((prevState) => ({ incorrect: prevState.incorrect + 1 }));
    }
    this.setState(
      (prevState) => ({
        answered: prevState.answered.map((val, idx) =>
          page === idx ? 1 : val
        ),
      }),
      () => {
        const { correct, incorrect, questionCount } = this.state;

        if (questionCount === correct + incorrect) {
          this.setState({ show: screen.RESULT });
        } else {
          this.scrollView.scrollTo({ x: (page + 1) * SCREEN_WIDTH });

          this.setState((prevState) => ({
            show: screen.QUESTION,
          }));
        }
      }
    );
  };
  handleReset = () => {
    this.setState((prevState) => ({
      show: screen.QUESTION,
      correct: 0,
      incorrect: 0,
      answered: Array(prevState.questionCount).fill(0),
    }));
  };
  render() {
    const { questions } = this.props.deck;
    const { show } = this.state;

    if (questions.length === 0) {
      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: "center" }]}>
              There are no cards in the deck. Please add some cards and try
              again.
            </Text>
          </View>
        </View>
      );
    }

    if (this.state.show === screen.RESULT) {
      const { correct, questionCount } = this.state;
      const percent = ((correct / questionCount) * 100).toFixed(0);
      const resultStyle =
        percent >= 50 ? styles.resultTextGood : styles.resultTextBad;

      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: "center" }]}>
              Quiz Complete
            </Text>

            {percent >= 50 ? (
              <Image
                source={Happy}
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  marginTop: 30,
                }}
              />
            ) : (
              <Image
                source={Sad}
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  marginTop: 30,
                }}
              />
            )}
          </View>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: "center" }]}>
              Your Results
            </Text>
            <Text style={resultStyle}>{percent}%</Text>
            <Text style={[resultStyle, { fontSize: 20 }]}>
              {correct} / {questionCount} correct
            </Text>
          </View>
          <View>
            <TouchButton
              btnStyle={[
                { backgroundColor: green, borderColor: white },
                styles.button,
              ]}
              onPress={this.handleReset}
            >
              Restart Quiz
            </TouchButton>
            <TouchButton
              btnStyle={[
                { backgroundColor: white, borderColor: black },
                styles.button,
              ]}
              txtStyle={{ color: black }}
              onPress={() => {
                this.handleReset();
                this.props.navigation.goBack();
              }}
            >
              Back To Deck
            </TouchButton>
            <TouchButton
              btnStyle={[
                { backgroundColor: black, borderColor: white },
                styles.button,
              ]}
              txtStyle={{ color: white }}
              onPress={() => {
                this.handleReset();
                this.props.navigation.navigate("Home");
              }}
            >
              Home
            </TouchButton>
          </View>
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.container}
        pagingEnabled={true}
        horizontal={true}
        onMomentumScrollBegin={this.handleScroll}
        ref={(scrollView) => {
          this.scrollView = scrollView;
        }}
      >
        {questions.map((question, idx) => (
          <View style={styles.pageStyle} key={idx}>
            <View style={styles.block}>
              <Text style={styles.count}>
                {idx + 1} / {questions.length}
              </Text>
              <Text style={styles.questionText}>
                {show === screen.QUESTION ? "Question" : "Answer"}
              </Text>
            </View>
            <View style={[styles.block, styles.questionContainer]}>
              <View style={styles.questionWrapper}>
                <Text style={styles.title}>
                  {show === screen.QUESTION
                    ? question.question
                    : question.answer}
                </Text>
              </View>
            </View>
            {show === screen.QUESTION ? (
              <TextButton
                txtStyle={{ color: black }}
                onPress={() => this.setState({ show: screen.ANSWER })}
              >
                Tap to flip
              </TextButton>
            ) : (
              <TextButton
                txtStyle={{ color: black }}
                onPress={() => this.setState({ show: screen.QUESTION })}
              >
                Tap to flip
              </TextButton>
            )}
            <View>
              <TouchButton
                btnStyle={[
                  {
                    backgroundColor: white,
                    borderColor: green,
                    borderRadius: 30,
                  },
                  styles.button,
                ]}
                txtStyle={{ color: green }}
                onPress={() => this.handleAnswer(answer.CORRECT, idx)}
                disabled={this.state.answered[idx] === 1}
              >
                Correct
              </TouchButton>
              <TouchButton
                btnStyle={[
                  {
                    backgroundColor: white,
                    borderColor: red,
                    borderRadius: 30,
                  },
                  styles.button,
                ]}
                txtStyle={{ color: red }}
                onPress={() => this.handleAnswer(answer.INCORRECT, idx)}
                disabled={this.state.answered[idx] === 1}
              >
                Incorrect
              </TouchButton>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageStyle: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: white,
    justifyContent: "space-around",
    width: SCREEN_WIDTH,
  },
  button: {
    borderRadius: 30,
    borderWidth: 2,
  },
  block: {
    marginBottom: 20,
  },
  count: {
    fontSize: 24,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  questionContainer: {
    shadowColor: black,
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 10,
    backgroundColor: white,
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexGrow: 1,
  },
  questionWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  questionText: {
    textDecorationLine: "underline",

    textAlign: "center",
    fontSize: 30,
  },
  resultTextGood: {
    color: green,
    fontSize: 46,
    textAlign: "center",
  },
  resultTextBad: {
    color: red,
    fontSize: 46,
    textAlign: "center",
  },
});

const mapStateToProps = (state, { title }) => {
  const deck = state[title];

  return {
    deck,
  };
};

export default withNavigation(connect(mapStateToProps)(QuizDetails));
