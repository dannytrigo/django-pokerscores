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
  eventchatmessageSet: EventChatMessage[];
}

export class EventPlayer {
  id: number;
  player: Person;
  attendance: string;
}

export class EventChatMessage {
  id: number;
  event: Event;
  fromPlayer: Person;
  sendDate: Date;
  text: string;

  //getSendDate() {
  //  return new Date(this.sendDate);
  //}
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
