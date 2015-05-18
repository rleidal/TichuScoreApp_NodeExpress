module tichuClient {
    'use strict';

    class teamHand {
        tichuL: string;
        tichuR: string;
        cardPts: number;
        contructor() {
            this.tichuL = "";
            this.tichuR = "";
            this.cardPts = 0;
        }
        get totalPts(): number {
            var pts: number = this.cardPts;

            pts += (this.tichuL == 'G') ? 200 :
                (this.tichuL == '!G') ? -200 :
                    (this.tichuL == 'T') ? 100 :
                        (this.tichuL == '!T') ? -100 : 0;
            pts += (this.tichuR == 'G') ? 200 :
                (this.tichuR == '!G') ? -200 :
                    (this.tichuR == 'T') ? 100 :
                        (this.tichuR == '!T') ? -100 : 0;

            return pts;
        }
    }

    class team {
        nameL: string;
        nameR: string;
        score: number;
        id: number;
        hands: teamHand[];
        handIn: teamHand;
        constructor(l: string, r: string) {
            this.nameL = l;
            this.nameR = r;
            this.score = 0;
            this.hands = [];
            this.id = 0;
            this.handIn = new teamHand();
        }
        addHand(h: teamHand) {
            this.score += h.totalPts;
            this.hands.push(h);
        }
        store() {
            this.addHand(this.handIn);
            this.handIn = new teamHand();
        }
    }

    interface tichuScoreSheetView extends ng.IScope {
        msg_list: string[];

        teams: team[];

        events: tichuScoreClientController;
    }




    export class tichuScoreClientController {
        view: tichuScoreSheetView;

        constructor($scope: tichuScoreSheetView) {
            this.view = $scope;
            this.view.events = this;
            this.init_sample();
        }

        init_sample() {
            var x: number;

            this.view.teams = [];
            this.view.teams.push(new team("Fran", "Steve"));
            this.view.teams.push(new team("Ryan", "Mark"));
            this.view.teams[0].id = 0;
            this.view.teams[1].id = 1;
        }
        go() {
            this.view.teams[0].store();
            this.view.teams[1].store();
        }
        swap() {
            var temp: team = this.view.teams[0];
            this.view.teams[0] = this.view.teams[1];
            this.view.teams[1] = temp;
        }
        updatePts(i: number) {
            var pts_i: number = this.view.teams[i].handIn.cardPts;
            var pts_other: number = 0;

            if (200 != pts_i) {
                pts_other = 100 - pts_i;
            }
            this.view.teams[i ^ 1].handIn.cardPts = pts_other;
        }
    }


}