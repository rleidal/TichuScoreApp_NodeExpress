# TichuScoreApp_NodeExpress

Communication Rooms:
/
	- Login / Connect
	- Admin Update
		Client->Server{Profile Fields, Target Profile}
		Server->Client{Ack Message}
	- Profile Update
		Client->Server{Profile Fields}
		Server->Client{Ack Message}
	- Game List
		Client->Server {RequestGameList}
		Server->Client ListOf {TeamA, TeamB, ScoreA, ScoreB, GameID}

/Game<ID>
	- Scorekeeper Request
		Client->Server {Request, GameID}
		Server->Client {Allow/Deny}
	- Scorekeeper Response
		Server->Client {Request}
		Client->Server {Alow/Deny | Timeout}
	- Scorekeeper Score Hand (ScoreKeeper)
		Client->Server {TeamA Pts, TeamB Pts, TichuList, GameID, HandID}
	- Update Score
		Server->Client {TeamA Pts, TeamB Pts, TichuList, GameID, HandID, CurrentScore}
	- Initial Game Data
		{TeamA, TeamB, Current HandCnt}
		List of UpdateScores

