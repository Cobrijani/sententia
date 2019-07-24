import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBlog } from 'app/shared/model/blog/blog.model';

type EntityResponseType = HttpResponse<IBlog>;
type EntityArrayResponseType = HttpResponse<IBlog[]>;

@Injectable({ providedIn: 'root' })
export class BlogService {
  public resourceUrl = SERVER_API_URL + 'services/blog/api/blogs';

  constructor(protected http: HttpClient) {}

  create(blog: IBlog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(blog);
    return this.http
      .post<IBlog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(blog: IBlog): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(blog);
    return this.http
      .put<IBlog>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBlog>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBlog[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(blog: IBlog): IBlog {
    const copy: IBlog = Object.assign({}, blog, {
      created: blog.created != null && blog.created.isValid() ? blog.created.toJSON() : null,
      modified: blog.modified != null && blog.modified.isValid() ? blog.modified.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.created = res.body.created != null ? moment(res.body.created) : null;
      res.body.modified = res.body.modified != null ? moment(res.body.modified) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((blog: IBlog) => {
        blog.created = blog.created != null ? moment(blog.created) : null;
        blog.modified = blog.modified != null ? moment(blog.modified) : null;
      });
    }
    return res;
  }
}
