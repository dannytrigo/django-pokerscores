import { Component, Input, OnInit } from '@angular/core';
import {Event, EventPlayer} from '../api/types';
import gql from 'graphql-tag';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';

import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../auth.service';
import {PokerCard, PokerHand} from '../pokerhand/pokerhand.component';

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.scss']
})

export class EventdetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private apollo: Apollo,
              public authSvc: AuthService,
              ) { }

  @Input()
  eventId: number;
  event: Event;
  sub: any;
  myEventPlayer: EventPlayer;

  faTrophy = faTrophy;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = + params.id;
    });

    interface Response {
      event: Event;
    }

    const EventQuery = gql`
        query GetEvent($id: Int!) {
          event(id: $id) {
            id
            date
            status
            highHand
            highHandWinner {
              id
              nickname
            }
            host {
              id
              nickname
            }
            eventplayerSet {
              id
              player {
                id
                nickname
              }
              attendance
            }
            gameSet {
              id
              stake
              number
              gameplayerSet {
                id
                player {
                  id
                  nickname
                }
                position
                winnings
                rebuys
              }
            }
            eventchatmessageSet {
              id
              fromPlayer {
                id
                nickname
              }
              sendDate
              text
            }
          }
        }
      `;

    this.apollo.watchQuery<Response>({
      query: EventQuery,
      variables: {
        id: this.eventId,
      }
    }).valueChanges.subscribe(({data}) => {
      console.log(data);
      this.event = data.event;
      this.myEventPlayer = null;
      if (this.authSvc.isUserLoggedIn) {
        for (const eventPlayer of this.event.eventplayerSet) {
          console.log(eventPlayer);
          console.log(eventPlayer.player.id);
          console.log(this.authSvc.profileId);
          if (eventPlayer.player.id == this.authSvc.profileId) {
            console.log('Match');
            this.myEventPlayer = eventPlayer;
          }
        }
      }
      if (this.myEventPlayer == null) {
        this.myEventPlayer = new EventPlayer();
        this.myEventPlayer.attendance = 'NA';
        this.event.eventplayerSet.push(this.myEventPlayer);
      }
    });
  }

  setAttendance(attendance) {
    const UpdateEventAttendance = gql`
      mutation UpdateEventAttendance($eventId: Int!, $attendance: String!) {
        updateEventAttendance(eventId: $eventId, attendance: $attendance) {
          eventPlayer {
            id
            attendance
            player {
              id
              nickname
            }
          }
        }
      }
    `;

    interface UpdateEventAttendance {
      eventPlayer: EventPlayer;
    }
    interface Response {
      updateEventAttendance: UpdateEventAttendance;
    }

    console.log('Set my attendance to ' + attendance);
    this.apollo.mutate<Response>({
      mutation: UpdateEventAttendance,
      variables: {
        eventId: this.eventId,
        attendance: attendance,
      }
    }).subscribe(({data}) => {
      console.log(data);
      this.myEventPlayer = data.updateEventAttendance.eventPlayer;
      console.log(data.updateEventAttendance.eventPlayer);
    });
  }

  filter_players(attendance_statuses, players) {
    if (players) {
      return players.filter(x => attendance_statuses.includes(x.attendance));
    } else {
      return null;
    }
  }
  status_text(status) {
    if (status === 'P') { return 'Proposed';  }
    if (status === 'C') { return 'Confirmed'; }
    if (status === 'X') { return 'Cancelled'; }
    if (status === 'F') { return 'Finished'; }
  }

  isPastYear() {
    if (this.event) {
      const today = new Date();
      const eventDate = new Date(this.event.date);
      return eventDate.getFullYear() < today.getFullYear();
    }
    return false;
  }

  comparePosition(player1, player2) {
    if (player1.position == player2.position) {
      return 0
    } else if (player1.position == 0) {
      return 1;
    } else if (player2.position == 0) {
      return -1;
    } else {
      return (player1.position < player2.position ? -1 : 1);
    }
  }

  playersOrderedByWinner(players) {
    const sorted = players.sort(this.comparePosition);
    console.log('sorted');
    console.log(sorted);
    return sorted;
  }

  getHighHand() {
    if (this.event && this.event.highHand) {
      const hand = new PokerHand();
      for (let i = 0; i < 5; i++) {
        const cardstr = this.event.highHand.substring(i * 2, (i * 2) + 2);
        const cardval = cardstr[0];
        let cardvalnum: number;
        const cardsuit = cardstr[1];
        if (cardval === 'A') { cardvalnum = 1; }
        if (cardval === 'J') { cardvalnum = 11; }
        if (cardval === 'Q') { cardvalnum = 12; }
        if (cardval === 'K') { cardvalnum = 13; }
        if (cardval >= '1' && cardval <= '9') { cardvalnum = Number(cardval); }
        const pokerCard = new PokerCard(cardsuit, cardvalnum);
        hand.cards.push(pokerCard);
      }
      return hand;
    }
    return null;
  }
}
