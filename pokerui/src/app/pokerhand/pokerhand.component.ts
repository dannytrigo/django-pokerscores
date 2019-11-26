import {Component, Input, OnInit} from '@angular/core';

export const HEART = 'H';
export const DIAMOND = 'D';
export const SPADE = 'S';
export const CLUB = 'C';

export class PokerCard {
  value: number;
  suit: string;
  constructor(suit: string, value: number) {
    this.suit = suit;
    this.value = value;
  }
}

export class PokerHand {
  cards: PokerCard[];
  constructor() {
    this.cards = [];
  }
}

@Component({
  selector: 'app-pokerhand',
  templateUrl: './pokerhand.component.html',
  styleUrls: ['./pokerhand.component.scss']
})
export class PokerhandComponent implements OnInit {

  constructor() { }


  @Input()
  pokerHand: PokerHand;

  ngOnInit() {
  }

  getCardSvg(card) {
    let svg = '';
    if (card.suit === HEART)   { svg = 'heart'; }
    if (card.suit === DIAMOND) { svg = 'diamond'; }
    if (card.suit === SPADE)   { svg = 'spade'; }
    if (card.suit === CLUB)    { svg = 'club'; }
    svg = svg + '_';
    if (card.value < 11) { svg = svg + card.value.toString(); }
    if (card.value === 11 ) { svg = svg + 'jack'; }
    if (card.value === 12 ) { svg = svg + 'queen'; }
    if (card.value === 13 ) { svg = svg + 'king'; }

    return svg;
  }
}
