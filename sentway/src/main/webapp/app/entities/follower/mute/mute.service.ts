import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMute } from 'app/shared/model/follower/mute.model';

type EntityResponseType = HttpResponse<IMute>;
type EntityArrayResponseType = HttpResponse<IMute[]>;

@Injectable({ providedIn: 'root' })
export class MuteService {
  public resourceUrl = SERVER_API_URL + 'services/follower/api/mutes';

  constructor(protected http: HttpClient) {}

  create(mute: IMute): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mute);
    return this.http
      .post<IMute>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(mute: IMute): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mute);
    return this.http
      .put<IMute>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMute>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMute[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(mute: IMute): IMute {
    const copy: IMute = Object.assign({}, mute, {
      created: mute.created != null && mute.created.isValid() ? mute.created.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.created = res.body.created != null ? moment(res.body.created) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((mute: IMute) => {
        mute.created = mute.created != null ? moment(mute.created) : null;
      });
    }
    return res;
  }
}
