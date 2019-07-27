import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMute } from 'app/shared/model/follower/mute.model';
import { AccountService } from 'app/core';
import { MuteService } from './mute.service';

@Component({
  selector: 'jhi-mute',
  templateUrl: './mute.component.html'
})
export class MuteComponent implements OnInit, OnDestroy {
  mutes: IMute[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected muteService: MuteService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.muteService
      .query()
      .pipe(
        filter((res: HttpResponse<IMute[]>) => res.ok),
        map((res: HttpResponse<IMute[]>) => res.body)
      )
      .subscribe(
        (res: IMute[]) => {
          this.mutes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMutes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMute) {
    return item.id;
  }

  registerChangeInMutes() {
    this.eventSubscriber = this.eventManager.subscribe('muteListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
