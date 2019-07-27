import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mute } from 'app/shared/model/follower/mute.model';
import { MuteService } from './mute.service';
import { MuteComponent } from './mute.component';
import { MuteDetailComponent } from './mute-detail.component';
import { MuteUpdateComponent } from './mute-update.component';
import { MuteDeletePopupComponent } from './mute-delete-dialog.component';
import { IMute } from 'app/shared/model/follower/mute.model';

@Injectable({ providedIn: 'root' })
export class MuteResolve implements Resolve<IMute> {
  constructor(private service: MuteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMute> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Mute>) => response.ok),
        map((mute: HttpResponse<Mute>) => mute.body)
      );
    }
    return of(new Mute());
  }
}

export const muteRoute: Routes = [
  {
    path: '',
    component: MuteComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sentwayApp.followerMute.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MuteDetailComponent,
    resolve: {
      mute: MuteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sentwayApp.followerMute.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MuteUpdateComponent,
    resolve: {
      mute: MuteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sentwayApp.followerMute.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MuteUpdateComponent,
    resolve: {
      mute: MuteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sentwayApp.followerMute.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mutePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MuteDeletePopupComponent,
    resolve: {
      mute: MuteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sentwayApp.followerMute.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
