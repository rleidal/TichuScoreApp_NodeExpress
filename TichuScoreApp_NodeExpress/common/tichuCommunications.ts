module tichuCommunications {
    'use strict';


    //Client Side interfaces
    export interface s2cEnterGameResponse_func { (game_info: tichuInterfaces.gameInfo_intf): void }
    export interface s2cBooleanResponse_func { (result: boolean, error: string) }

    export interface clientSocket {
        //Scoring
        enterGame(game_id: number, response_cb: s2cEnterGameResponse_func): void;
        sendHandScore(game_id: number, hand: tichuInterfaces.handUpdate_intf, response_cb: s2cBooleanResponse_func): void;

        //Query
        getGameList(): void; //TODO: add parameters to reduce list size

        //User & Admin
        updateProfile(profile: tichuInterfaces.user_profile_intf, response_cb: s2cBooleanResponse_func): void;
        authorizeUsers(response_cb: s2cBooleanResponse_func): void; //Todo: Fill this out to allow admins to add to the use table, via googleIDs
        login(response_cb: s2cBooleanResponse_func): void;  //Todo: should we allow the sockets before login and anyone can view, or only allow logged in users
        logout(response_cb: s2cBooleanResponse_func): void;
    }

}

