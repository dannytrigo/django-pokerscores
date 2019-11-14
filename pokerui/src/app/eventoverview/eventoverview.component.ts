import {Component, Input, OnInit} from '@angular/core';
import { faHourglassHalf, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle as faCheckCircleReg } from '@fortawesome/free-regular-svg-icons';
import {Event} from '../api/types';

@Component({
  selector: 'app-eventoverview',
  templateUrl: './eventoverview.component.html',
  styleUrls: ['./eventoverview.component.scss']
})
export class EventoverviewComponent implements OnInit {

  constructor() {}

  faProposed = faHourglassHalf;
  faConfirmed = faCheckCircleReg;
  faCancelled = faTimesCircle;
  faFinished = faCheckCircle;

  getEventIcon(event) {
    switch (event.status) {
      case 'P': return this.faProposed;
      case 'C': return this.faConfirmed;
      case 'X': return this.faCancelled;
      case 'F': return this.faFinished;
    }
  }

  @Input()
  event: Event;

  ngOnInit() {
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
    const today = new Date();
    const eventDate = new Date(this.event.date);
    return eventDate.getFullYear() < today.getFullYear();

  }
}
