export interface Person {
  id: number;
  nickname: string;
  hasAvatar: boolean;
}

export interface Event {
  id: number;
  date: string;
  status: string;
  host: Person;
  eventplayerSet: EventPlayer[];
  gameSet: Game[];
  maxPlayers: number;
  minPlayers: number;
}

export class EventPlayer {
  id: number;
  player: Person;
  attendance: string;
}

export interface Game {
  id: number;
  number: number;
  stake: number;
  gameplayerSet: GamePlayer[];
}

export interface GamePlayer {
  id: number;
  player: Person;
  position: number;
  winnings: number;
  rebuys: number;
  game: Game;
}
