import { Component, OnInit } from '@angular/core';
import {GamePlayer, Person} from '../api/types';
import gql from 'graphql-tag';
import {ActivatedRoute} from '@angular/router';
import {Apollo} from 'apollo-angular';

@Component({
  selector: 'app-playerdetails',
  templateUrl: './playerdetails.component.html',
  styleUrls: ['./playerdetails.component.scss']
})
export class PlayerdetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private apollo: Apollo) { }

  gamePlayers: GamePlayer[];
  nickname: string;
  played: number;
  winnings: number;
  firstPlaces: number;
  secondPlaces: number;
  thirdPlaces: number;
  hasAvatar: boolean;

  profileId: number;
  sub: any;


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.profileId = + params.id;
    });

    interface GameResponse {
      gameplayers: GamePlayer[];
    }

    interface ProfileResponse {
      profile: Person;
    }

    const ProfileQuery = gql`
    query GetProfile($id: Int!) {
      profile(id: $id) {
        nickname
        hasAvatar
      }
    }`;

    const GameQuery = gql`
        query GetPlayerGames($id: Int!) {
          gameplayers(playerId: $id) {
            id
            game {
              id
              number
              stake
              event {
                id
                date
                host {
                  id
                  nickname
                }
              }
            }
            position
            winnings
            rebuys
          }
        }
      `;
    this.apollo.watchQuery<GameResponse>({
      query: GameQuery,
      variables: {
        id: this.profileId,
      }
    }).valueChanges.subscribe(({data}) => {
      console.log(data);
      this.gamePlayers = data.gameplayers;
      this.winnings = 0;
      this.firstPlaces = 0;
      this.secondPlaces = 0;
      this.thirdPlaces = 0;
      this.played = this.gamePlayers.length;
      for (const gamePlayer of this.gamePlayers) {
        console.log(gamePlayer.id);
        console.log(this.winnings);
        this.winnings = this.winnings + gamePlayer.winnings;
        if (gamePlayer.position === 1) {
          this.firstPlaces += 1;
        } else if (gamePlayer.position === 2) {
          this.secondPlaces += 1;
        } else if (gamePlayer.position === 3) {
          this.thirdPlaces += 1;
        }
      }
    });
    this.apollo.watchQuery<ProfileResponse>({
      query: ProfileQuery,
      variables: { id: this.profileId, },
    }).valueChanges.subscribe(({data}) => {
      console.log(data);
      this.nickname = data.profile.nickname;
      this.hasAvatar = data.profile.hasAvatar;
    });
  }

}
