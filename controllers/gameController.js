const uuid = require("uuid");
const Game = require("../models/Game");
const Player = require("../models/Player");

let games = [];

/**
 * Create a new game and render the createGame view.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.createGameGET = function (req, res) {
	let gameId = uuid.v4();
	res.render("createGame", { gameId });
};

/**
 * Create a new game based on the provided data and add it to the games array.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.createGamePOST = function (req, res) {
	console.log(req.body);
	let { playersName, gameType, gameId } = req.body;
	let players = [];

	for (let i = 0; i < playersName.length; i++) {
		let id = uuid.v4();
		players.push(new Player(id, playersName[i]));
	}

	games.push(new Game(gameId, gameType, players));
	console.log(games[games.length - 1]);
	return res.status(200).json({ message: "Juego creado con éxito!" });
};

/**
 * Get the status of a specific game based on the provided game ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.gameStatus = function (req, res) {
	for (let i = 0; i < games.length; i++) {
		let game = games[i];
		if (game.id === req.params.id) {
			return res.status(200).json({ game });
		}
	}
	return res.status(404).json({ message: "Juego no encontrado" });
};

/**
 * Render the startGame view with the list of games.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.startGameGET = function (req, res) {
	res.render("startGame", { games });
};

/**
 * Start a game by updating the player bets based on the provided data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.startGamePOST = function (req, res) {
	console.log(req.body);
	let { gameId: id, playersBet } = req.body;

	for (let i = 0; i < games.length; i++) {
		let game = games[i];
		if (game.id === id) {
			game.players.forEach((player, i) => {
				player.bet = playersBet[i];
			});
			game.inProgress = true;
			return res.status(200).json({ message: "Que empiece el juego!" });
		}
	}

	return res.status(404).json({ message: "Juego no encontrado" });
};

/**
 * Get the winner of a specific game based on the provided game ID and dice result.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getWinnerGame = function (req, res) {
	let diceResult = Math.floor(Math.random() * 6) + 1;
	console.log(diceResult);

	for (let game of games) {
		if (game.id === req.params.id) {
			if (game.inProgress) {
				for (let player of game.players) {
					if (player.bet == diceResult) {
						game.winner = player;
						game.inProgress = false;
						return res.status(200).json({ player });
					}
				}

                game.inProgress = false;
                return res.status(200).json({
                    message: `Ningún jugador acertó, cayó el número: ${diceResult}`,
                });
			} else {
                return res.status(200).json({
                    message: 'Lo siento, este juego ya ha finalizado',
                });
            }
		}
	}

    return res.status(200).json({
        message: 'El ID ingresado no corresponde con ningún Juego',
    });
};
