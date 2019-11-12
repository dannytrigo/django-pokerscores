export interface Person {
  id: number;
  nickname: string;
}

export interface Event {
  id: number;
  date: string;
  status: string;
  host: Person;
  eventplayerSet: EventPlayer;
}

export interface EventPlayer {
  id: number;
  Player: Person;
  attendance: string;
}
