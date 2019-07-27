import { Moment } from 'moment';
import { IPerson } from 'app/shared/model/follower/person.model';

export interface IFollow {
  id?: number;
  created?: Moment;
  follower?: IPerson;
  followee?: IPerson;
  person?: IPerson;
}

export class Follow implements IFollow {
  constructor(public id?: number, public created?: Moment, public follower?: IPerson, public followee?: IPerson, public person?: IPerson) {}
}
