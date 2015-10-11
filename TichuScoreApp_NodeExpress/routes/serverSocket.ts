var baseSocket = require('socket.io/lib/socket');

//var this: tichuCommunications.serverSocket;

baseSocket.prototype.updateScore = 
function (score_data: tichuInterfaces.gameUpdate_intf): void {
    this.broadcast.to(this.currentGame).emit("s2c_UpdateScore", score_data);
}

baseSocket.prototype.genRoomStr =
function (id: number): string {
    return "GameRoom_" + id;
}

baseSocket.prototype.enterGame =
function (id: number): void {
    console.log("Entering game " + id);
    if (this.currentGame) {
        this.leave(this.currentGame);
    }
    this.gameID = id;
    this.currentGame = this.genRoomStr(id);
    this.join(this.currentGame);
}

function ssUpdate (): void {
}

export = ssUpdate;