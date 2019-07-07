import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SentwaySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [SentwaySharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [SentwaySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SentwaySharedModule {
  static forRoot() {
    return {
      ngModule: SentwaySharedModule
    };
  }
}
