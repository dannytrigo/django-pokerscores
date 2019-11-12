import { Component, Input, OnInit } from '@angular/core';
import {Event} from '../api/types';
import gql from 'graphql-tag';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.scss']
})

export class EventdetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private apollo: Apollo) { }

  @Input()
  eventId: number;
  event: Event;
  sub: any;

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



}
