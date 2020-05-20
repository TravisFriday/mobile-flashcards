import React, { Component } from "react";
import QuizDetails from "./QuizDetails";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

export class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("title", "");
    return {
      title: `${title} Quiz`,
    };
  };
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");

    return <QuizDetails title={title} />;
  }
}

export default Quiz;
