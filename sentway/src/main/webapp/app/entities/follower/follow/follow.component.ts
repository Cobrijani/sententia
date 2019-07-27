import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFollow } from 'app/shared/model/follower/follow.model';
import { AccountService } from 'app/core';
import { FollowService } from './follow.service';

@Component({
  selector: 'jhi-follow',
  templateUrl: './follow.component.html'
})
export class FollowComponent implements OnInit, OnDestroy {
  follows: IFollow[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected followService: FollowService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.followService
      .query()
      .pipe(
        filter((res: HttpResponse<IFollow[]>) => res.ok),
        map((res: HttpResponse<IFollow[]>) => res.body)
      )
      .subscribe(
        (res: IFollow[]) => {
          this.follows = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFollows();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFollow) {
    return item.id;
  }

  registerChangeInFollows() {
    this.eventSubscriber = this.eventManager.subscribe('followListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
