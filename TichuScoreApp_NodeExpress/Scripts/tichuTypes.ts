class Team_GI {
    p1: string;
    p2: string;
    score: number;

    constructor(p1: string, p2:string) {
        this.score = 0;
        this.p1 = p1;
        this.p2 = p2;
    }
}

enum TICHU { none = 0, G_make = 200, G_fail = -200, make = 100, fail = -100 };
class Team_HI {
    p1_tichu: TICHU;
    p2_tichu: TICHU;
    team_points: number;

    get score(): number {
        var score: number = 0;

        score += this.team_points;
        score += this.p1_tichu + this.p2_tichu;

        return score;
    }

    verifyPoints(): boolean {
        //Points need to be between -25:125, or 200 for a one_two
        return (this.team_points <= 125 && this.team_points >= -25) || (this.team_points == 200);
    }

    constructor() {
        this.p1_tichu = TICHU.none;
        this.p2_tichu = TICHU.none;
        this.team_points = 0;
    }
}

class Hand{
    A: Team_HI;
    B: Team_HI;

    verifyPoints(): boolean {
        var ok: boolean = true;
        var total: number = this.A.team_points + this.B.team_points;

        ok = ok && this.A.verifyPoints();
        ok = ok && this.B.verifyPoints();
        ok = ok && ((total == 100) || (total == 200));

        return ok;
    }
}

class Game {
    teamA: Team_GI;
    teamB: Team_GI;

    score: number;

//    id: number;

    constructor(private id: number) {
//        this.id = id;
        this.teamA = new Team_GI("Ryan", "Fran");
        this.teamB = new Team_GI("Mark", "Steve");
    }
}