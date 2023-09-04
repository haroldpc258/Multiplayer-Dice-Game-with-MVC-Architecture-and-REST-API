# **Multi-player Dice Game**
This project is an implementation of a multi-player dice game using Node.js. 
It is a REST API that allows for game creation, querying game status, determining the game winner, and starting the game with bets per player.

## Features
The dice game has the following functionalities:

- Game creation
- Game status querying
- Determining the game winner
- Starting the game with bet per player
  
## Usage
### Game Creation

To create a new game, send a POST request to the following URL:

    POST http://localhost:8080/createGame

### Querying Game Status
To query the status of a game, send a GET request to the following URL:

    GET: http://localhost:8080/game/{gameId}
Replace {gameId} with the identifier of the game. 

### Determining the Game Winner
To determine the winner of a game, send a GET request to the following URL:

    GET http://localhost:8080/game/{gameId}/winner
Replace {gameId} with the identifier of the game. 

### Starting the Game with Bet per Player
To start a game with a bet per player, send a POST request to the following URL:

    POST http://localhost:8080/startGame

## Installation
To install and run the dice game on your own system, follow these steps:

- Clone the repository.
- Navigate to the repository directory in your terminal.
- Run `npm install` to install the dependencies.
- Run `npm startDev` to start the server.

