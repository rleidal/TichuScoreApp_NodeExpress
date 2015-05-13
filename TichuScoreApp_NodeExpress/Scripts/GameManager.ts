
class Game {
    teamA: string;
    teamB: string;
    scoreA: number;
    scoreB: number;
    hands: Hand;
    constructor() {
        this.scoreA = 0;
        this.scoreB = 0;
    }
}

interface GameMap {
    [index: number]: Game;
}


class GameManger {
    currentGames: GameMap;

    constructor() {
        this.currentGames[1] = new Game();

        this.currentGames[1].teamA = "Foose/Fran";
        this.currentGames[1].teamB = "Ryan/Steve";
    }


};

export function create() {
    return new GameManger();
}