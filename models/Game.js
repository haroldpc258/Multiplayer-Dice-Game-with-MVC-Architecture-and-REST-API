module.exports = class Game {
    
    constructor(id, type, players) {
        this.id = id;
        this.type = type;
        this.players = players;
        this.inProgress = false;
        this.winner = null;
    }
};
