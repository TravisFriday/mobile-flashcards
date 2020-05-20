import React from "react";
import { Platform } from "react-native";
import * as Icon from "@expo/vector-icons";
import {
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";
import DeckList from "./DeckList";
import AddDeck from "./AddDeck";
import DeckDetail from "./DeckDetail";
import AddCard from "./AddCard";
import Quiz from "./Quiz";
import Settings from "./Settings";
import { darkGray, white, gray, black } from "../utils/colors";
import { createAppContainer } from "react-navigation";

const isIOS = Platform.OS === "ios" ? true : false;

const routeConfigs = {
  Decks: {
    screen: DeckList,

    navigationOptions: {
      tabBarLabel: "Decks",

      tabBarIcon: ({ tintColor }) => (
        <Icon.FontAwesome
          name={isIOS ? "list" : "list"}
          size={30}
          color={tintColor}
        />
      ),
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <Icon.FontAwesome name="plus" size={30} color={tintColor} />
      ),
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: "Refresh Data",
      tabBarIcon: ({ tintColor }) => (
        <Icon.FontAwesome name="refresh" size={30} color={tintColor} />
      ),
    },
  },
};

const tabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  defaultNavigationOptions: {
    bounces: true,
  },
  tabBarOptions: {
    activeTintColor: black,
    style: {
      height: 60,
      backgroundColor: white,
      shadowColor: "rgba(0,0,0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      borderTopWidth: 1,
      borderTopColor: darkGray,
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: "bold",
    },
    tabStyle: {
      marginTop: 5,
      marginBottom: 3,
    },
    showIcon: true,
  },
};

const Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);

const MainTabNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: {
        headerTintColor: gray,
        headerStyle: {
          backgroundColor: black,
        },
        title: "Deck Details",
      },
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTintColor: gray,
        headerStyle: {
          backgroundColor: black,
        },
        headerTitleStyle: {
          justifyContent: "center",
          textAlign: "center",
        },
        title: "Add Card",
      },
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: gray,
        headerStyle: {
          backgroundColor: black,
        },
      },
    },
  },
  { headerLayoutPreset: "center" }
);

export default createAppContainer(MainTabNavigator);
