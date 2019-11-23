import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Apollo} from "apollo-angular";
import {Person} from "../api/types";
import gql from "graphql-tag";

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.scss']
})
export class PlayerlistComponent implements OnInit {

  constructor(private apollo: Apollo) {}

  players = null;

  ngOnInit() {
    interface Response {
      profiles: Person[];
    }

    const PlayerQuery = gql`
        query getProfiles {
          profiles {
            id
            nickname
            hasAvatar
          }
        }
      `;

    this.apollo.watchQuery<Response>({
      query: PlayerQuery,
    }).valueChanges.subscribe(({data}) => {
      console.log(data);
      this.players = data.profiles;
    });
  }

}
