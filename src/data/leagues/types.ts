export interface Team {
	code: string;
	clubName: string;
	stadiumName: string;
	latitude: number;
	longitude: number;
}

export interface League {
	code: string;
	leagueName: string;
	teams: Team[];
}
