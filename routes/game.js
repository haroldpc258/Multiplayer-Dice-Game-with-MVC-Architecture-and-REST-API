var express = require("express");
var router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/createGame', gameController.createGameGET);

router.post('/createGame', gameController.createGamePOST);

router.get('/game/:id', gameController.gameStatus);

router.get('/startGame', gameController.startGameGET);

router.post('/startGame', gameController.startGamePOST);

router.get('/game/:id/winner', gameController.getWinnerGame);

module.exports = router;
