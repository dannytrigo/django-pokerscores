import { Component, OnInit , Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import gql from 'graphql-tag';
// import { GraphQLModule } from './graphql.module';
import { faCheckCircle, faTimesCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import { Event } from '../api/types';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})

export class EventlistComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faStar = faStar;

  constructor(private httpClient: HttpClient, private apollo: Apollo) {}

  events = null;

  futureEvents() {
    if ( this.events == null) {
      return null;
    }
    const today = new Date();
    return this.events.filter(x => Date.parse(x.date).valueOf() >= today.valueOf());
  }

  pastEvents() {
    if ( this.events == null) {
      return null;
    }
    const today = new Date();
    return this.events.filter(x => Date.parse(x.date).valueOf() < today.valueOf());
  }

  ngOnInit() {
    console.log('init');
    // this.httpClient.get('http://127.0.0.1:8000/api/events/').subscribe((data) => {
    //  this.events = data;
    // });

    interface Response {
      events: Event[];
    }

    const EventQuery = gql`
        {
          events(leagueId: 1, first: 100) {
            id
            date
            status
            host {
              id
              nickname
              hasAvatar
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
    }).valueChanges.subscribe(({data}) => {
      console.log(data);
      this.events = data.events;
    });
  }



}
