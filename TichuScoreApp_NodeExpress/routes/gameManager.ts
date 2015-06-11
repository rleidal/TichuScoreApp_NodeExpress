import tichuCommon = require('../public/javascripts/tichuCommon');
import tichuClient = require('../public/javascripts/tichuClientScoreModel');

interface enterGameReq {
    gameID: number;
    prevGameID?: number;
}

class gameManager {
    private cache: { [gameID: number]: tichuClient.tichuScoreModel };
    private socket_server: SocketIO.Server;

    constructor(ss: SocketIO.Server) {
        console.log("Creating a GameManager");
        this.socket_server = ss;
        initTestGames();
        this.cache = {};
        this.cache[1] = testGame1;
        this.cache[2] = testGame2;
    }

    enterGame(socket: SocketIO.Socket, req: enterGameReq, callback: tichuCommunications.s2cNewGameResponse_func ) {
        if (req.prevGameID != -1) {
//            console.log("Leaving game " + req.prevGameID);
            socket.leave(gameManager.genRoomStr(req.prevGameID));
            //TODO: remove empty games from cache
        }
//        console.log("Entering game " + req.gameID);
        socket.join(gameManager.genRoomStr(req.gameID));
        var gameUpdate: tichuCommon.gameUpdate;
        var game: tichuClient.tichuScoreModel;

        //TODO: fix this to check that the cache has the game
//        console.log("Building gameUpdate");
        gameUpdate = new tichuCommon.gameUpdate();
        game = this.cache[req.gameID];
        gameUpdate.gameID = req.gameID;
        gameUpdate.handList = [];

        var gameInfo: tichuInterfaces.gameInfo_intf = { game_ID: req.gameID, teams: [], currentScore:{}};
        var teamInfo = [];


        game.teamsInGame.forEach(team => {
//            console.log("foreach team: " + team.ID + '  ' + team.score);
            gameUpdate.currentScore[team.ID] = team.score;
            teamInfo.push({ ID: team.ID, players: team.players });
            team.handScores.forEach((hand, index) => {
//                console.log("foreach hand: " + index);
                if (gameUpdate.handList[index] === undefined) gameUpdate.handList[index] = new tichuCommon.hand();
                gameUpdate.handList[index].ID = index;
                gameUpdate.handList[index].teamHands[team.ID] = new tichuCommon.teamHand();
                gameUpdate.handList[index].teamHands[team.ID].runningTotal = hand.runningTotal;
                gameUpdate.handList[index].teamHands[team.ID].totalPts = hand.totalPts;
//                console.log("Points: " + hand.totalPts );
            });
        });


//        console.log("Sending gameUpdate");
        gameInfo.teams = teamInfo;
        gameInfo.currentScore = gameUpdate.currentScore;

        callback(gameInfo);
        socket.emit("updateGame", gameUpdate ); //TODO: generate game object
    }

    static genRoomStr(id: number): string {
        var room: string = "GameRoom_" + id;
//        console.log("Generated room: " + room);
        return room;
    }
};

var testGame1: tichuClient.tichuScoreModel;
var testGame2: tichuClient.tichuScoreModel;

function initTestGames() {
    testGame1 = new tichuClient.tichuScoreModel();
    testGame2 = new tichuClient.tichuScoreModel();

    testGame1.gameID = 1;
    testGame2.gameID = 2;

    //TODO: Remove this temp init code
    testGame1.teamsInGame = [];
    testGame1.teamsInGame.push(new tichuCommon.teamInGame(0));
    testGame1.teamsInGame.push(new tichuCommon.teamInGame(1));

    testGame1.teamsInGame[0].score = 175;
    testGame1.teamsInGame[1].score = 25;

    testGame1.teamsInGame[0].players = [];
    testGame1.teamsInGame[1].players = [];

    var th0: tichuCommon.teamHand = new tichuCommon.teamHand();
    var th1: tichuCommon.teamHand = new tichuCommon.teamHand();
    var th2: tichuCommon.teamHand = new tichuCommon.teamHand();
    var th3: tichuCommon.teamHand = new tichuCommon.teamHand();
    th0.totalPts = 75; th0.runningTotal = 75;
    th1.totalPts = 25; th1.runningTotal = 25;
    th2.totalPts = 100; th2.runningTotal = 175;
    th3.totalPts = 0; th3.runningTotal = 25;
    testGame1.teamsInGame[0].handScores = [th0, th2];
    testGame1.teamsInGame[1].handScores = [th1, th3];

    var tp: tichuCommon.gamble = new tichuCommon.gamble(0, true, tichuCommon.GAMBLE.TICHU);
    var tf: tichuCommon.gamble = new tichuCommon.gamble(0, false, tichuCommon.GAMBLE.TICHU);

    testGame1.teamsInGame[0].playerGambles = [[null, tp], [null, null]];
    testGame1.teamsInGame[1].playerGambles = [[null, null], [null, tf]];


    testGame1.teamsInGame[0].players.push(new tichuCommon.player('Ryan', 0));
    testGame1.teamsInGame[0].players.push(new tichuCommon.player('Fran', 1));
    testGame1.teamsInGame[1].players.push(new tichuCommon.player('Steve', 2));
    testGame1.teamsInGame[1].players.push(new tichuCommon.player('Mark', 3));



    //TODO: Remove this temp init code
    testGame2.teamsInGame = [];
    testGame2.teamsInGame.push(new tichuCommon.teamInGame(0));
    testGame2.teamsInGame.push(new tichuCommon.teamInGame(1));

    testGame2.teamsInGame[0].score = 200;
    testGame2.teamsInGame[1].score = 0;

    testGame2.teamsInGame[0].players = [];
    testGame2.teamsInGame[1].players = [];

    var th0: tichuCommon.teamHand = new tichuCommon.teamHand();
    var th1: tichuCommon.teamHand = new tichuCommon.teamHand();
    var th2: tichuCommon.teamHand = new tichuCommon.teamHand();
    var th3: tichuCommon.teamHand = new tichuCommon.teamHand();
    th0.totalPts = 200; th0.runningTotal = 200;
    th1.totalPts = -100; th1.runningTotal = -100;
    th2.totalPts = 0; th2.runningTotal = 200;
    th3.totalPts = 100; th3.runningTotal = 0;
    testGame2.teamsInGame[0].handScores = [th0, th2];
    testGame2.teamsInGame[1].handScores = [th1, th3];

    testGame2.teamsInGame[0].playerGambles = [[null, null], [null, null]];
    testGame2.teamsInGame[1].playerGambles = [[null, tf], [tp, tf]];


    testGame2.teamsInGame[0].players.push(new tichuCommon.player('Matther', 4));
    testGame2.teamsInGame[0].players.push(new tichuCommon.player('Mark', 5));
    testGame2.teamsInGame[1].players.push(new tichuCommon.player('Luke', 6));
    testGame2.teamsInGame[1].players.push(new tichuCommon.player('John', 7));


}



export = gameManager;
