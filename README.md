# Mobile Flashcards

This is a mobile application that allows you to quiz yourself using flashcards.

# Getting Started

To get this project started run the following commands in the terminal:
`npm install` to install the project dependencies
`npm start` to start the project
If npm does not work, try:
`expo start` to start the project

# Features List

- Create Deck
- Add Card
- Delete Deck
- Delete Card
- Reset Data
- Take Quiz

## Data

The only data stored in the database is:
-Decks

| Attribute | Type   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| id        | String | The deck's unique identifier                          |
| title     | String | The Title of the Deck                                 |
| questions | Array  | A list of all the questions and answers for each Quiz |
| question  | String | A question for the user                               |
| answer    | String | The answer to the question asked                      |
