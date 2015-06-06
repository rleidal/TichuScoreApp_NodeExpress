﻿module tichuCommon {
    'use strict';

    export class player {
        constructor(public name:string, public ID: number) {
        }
    }

    export enum GAMBLE {
        TICHU = 100,
        GRAND_TICHU = 200,
        MAVERICK = 50,
    };
    export class gamble {
        private _value: number;
        _id: number;
        constructor(public player_id: number, public result: boolean, public bid: GAMBLE) {
            this._value = this.bid;
            if ((false == this.result) && (this.bid == GAMBLE.MAVERICK)) {
                this._value = 0;
            } else {
                this._value *= -1;
            }
        }
        get value(): number {
            return this._value;
        }
        get name(): string {
            var n: string = GAMBLE[this.bid][0];
            if (!this.result) {
                n = '!' + n;
            }
            return n;
        }
    }

    export class team {
        players: player[];
        constructor(public ID: number) {
            this.players = [];
        }
    }
    export class teamHand {
//        gambles: gamble[];
        totalPts: number;
        runningTotal: number; //Keep a running total within the teamHand
        constructor() {
            this.totalPts = 0;
            this.runningTotal = 0;
        }
//        get totalPts(): number {
//            var total: number;
//            total = this.cardPts;
////            this.gambles.forEach(g => {
////                total += g.value;
////           });
//            return total;
//        }
    }
    export class teamInGame extends team {
        score: number;
        handScores: teamHand[];
        playerGambles: gamble[][];
        constructor(ID: number) {
            super(ID);
            this.score = 0;
            this.handScores = [];
            this.playerGambles = [[]];
        }
    }

    export class hand {
        ID: number;
        teamHands: { [team_id: number]: teamHand };
        constructor() {
            this.ID = -1;
            this.teamHands = {};
        }
    }

    export class gameUpdate {
        gameID: number;
        currentScore: { [team_id: number]: number };
        handList: hand[];
        constructor() {
            this.gameID = -1;
            this.currentScore = {};
            this.handList = [];
        }
    }
}

declare var exports: any;
if (typeof exports != 'undefined') {
    exports.player = tichuCommon.player;
    exports.GAMBLE = tichuCommon.GAMBLE;
    exports.gamble = tichuCommon.gamble;
    exports.team = tichuCommon.team;
    exports.teamHand = tichuCommon.teamHand;
    exports.teamInGame = tichuCommon.teamInGame;
    exports.hand = tichuCommon.hand;
    exports.gameUpdate = tichuCommon.gameUpdate;
}