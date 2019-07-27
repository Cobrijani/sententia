import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SentwaySharedModule } from 'app/shared';
import {
  MuteComponent,
  MuteDetailComponent,
  MuteUpdateComponent,
  MuteDeletePopupComponent,
  MuteDeleteDialogComponent,
  muteRoute,
  mutePopupRoute
} from './';

const ENTITY_STATES = [...muteRoute, ...mutePopupRoute];

@NgModule({
  imports: [SentwaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MuteComponent, MuteDetailComponent, MuteUpdateComponent, MuteDeleteDialogComponent, MuteDeletePopupComponent],
  entryComponents: [MuteComponent, MuteUpdateComponent, MuteDeleteDialogComponent, MuteDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FollowerMuteModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
