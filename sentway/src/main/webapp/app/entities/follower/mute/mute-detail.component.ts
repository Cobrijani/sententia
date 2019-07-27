import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMute } from 'app/shared/model/follower/mute.model';

@Component({
  selector: 'jhi-mute-detail',
  templateUrl: './mute-detail.component.html'
})
export class MuteDetailComponent implements OnInit {
  mute: IMute;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mute }) => {
      this.mute = mute;
    });
  }

  previousState() {
    window.history.back();
  }
}
