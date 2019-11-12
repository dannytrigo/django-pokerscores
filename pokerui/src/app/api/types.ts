export interface Person {
  id: number;
  nickname: string;
}

export interface Event {
  id: number;
  date: string;
  status: string;
  host: Person;
  eventplayerSet: EventPlayer[];
  gameSet: Game[];
}

export interface EventPlayer {
  id: number;
  Player: Person;
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
}
