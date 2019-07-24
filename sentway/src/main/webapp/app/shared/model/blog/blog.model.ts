import { Moment } from 'moment';

export const enum Markup {
  PLAIN = 'PLAIN',
  HTML = 'HTML',
  MARKDOWN = 'MARKDOWN'
}

export interface IBlog {
  id?: number;
  title?: string;
  type?: Markup;
  category?: string;
  authorId?: string;
  authorName?: string;
  created?: Moment;
  modified?: Moment;
  content?: any;
}

export class Blog implements IBlog {
  constructor(
    public id?: number,
    public title?: string,
    public type?: Markup,
    public category?: string,
    public authorId?: string,
    public authorName?: string,
    public created?: Moment,
    public modified?: Moment,
    public content?: any
  ) {}
}
