import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-eventoverview',
  templateUrl: './eventoverview.component.html',
  styleUrls: ['./eventoverview.component.scss']
})
export class EventoverviewComponent implements OnInit {

  constructor() { }

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
}
