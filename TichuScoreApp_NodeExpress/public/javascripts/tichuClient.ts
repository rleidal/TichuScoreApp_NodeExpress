class teamHand {
    tichuL: string;
    tichuR: string;
    totalPts: number;
}

class team {
    nameL: string;
    nameR: string;
    score: number;
    hands: teamHand[];
    constructor(l: string, r:string) {
        this.nameL = l;
        this.nameR = r;
        this.score = 0;
//        this.score = 5 * Math.floor(Math.random() * 200);
        this.hands = [];
    }
    addHand(h: teamHand) {
        this.score += h.totalPts;
        this.hands.push(h);
    }
}

interface tichuScoreSheetView extends ng.IScope {
    msg_list: string[];
    sum: number;

    teams: team[];

    leftStyle: any;
    rightStyle: any;
    events: tichuScoreClientController;
}




class tichuScoreClientController {
    view: tichuScoreSheetView;

    constructor($scope: tichuScoreSheetView) {
        this.view = $scope;
        this.view.events = this;
        this.init_sample();
    }

    init_sample() {
        var x: number;

        this.view.sum = 6;
        this.view.teams = [];
        this.view.teams.push(new team("Fran", "Steve"));
        this.view.teams.push(new team("Ryan", "Mark"));
        this.view.leftStyle = { width: '15%', float: 'left', height: '20px' };
        this.view.rightStyle = { 'margin-left': '15%', height: '20px' };

        for (x = 0; x < 6; x++) {
            var scoreA, scoreB: number;
            scoreA = 5 * Math.floor(Math.random() * 30) - 25;
            scoreB = 100 - scoreA;
            this.view.teams[0].addHand({ totalPts: scoreA, tichuL: this.pickTS(), tichuR: this.pickTS() });
            this.view.teams[1].addHand({ totalPts: scoreB, tichuL: this.pickTS(), tichuR: this.pickTS() });
        }
    }

    pickTS(): string {
        var s: string = "";
        var r: number = Math.floor(Math.random() * 25);
        switch (r) {
            case 0,1: s = "!G"; break;
            case 2,3,4,5: s = "G"; break;
            case 6,7,8: s = "!T"; break;
            case 9,10,11,12,13,14,15: s = "T"; break;
        }
        return s;
    }

    swap() {
        var temp: team = this.view.teams[0];
        this.view.teams[0] = this.view.teams[1];
        this.view.teams[1] = temp;
//        temp = this.view.teams.shift();
//        this.view.teams.push(temp);
    }
}

    function userMsg(mtype: string, msg: string) {
        $("<div class='" + mtype + "'>").text(msg).appendTo("#log");
    }

    var errorMsg = userMsg.bind(null, "errorMsg");
    var warnMsg = userMsg.bind(null, "warnMsg");
    var infoMsg = userMsg.bind(null, "infoMsg");

    function submitScore() {
    }

    function requestScoreKeeper() {
    }

    function swapSides() {
    }
