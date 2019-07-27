import { Moment } from 'moment';
import { IPerson } from 'app/shared/model/follower/person.model';

export interface IMute {
  id?: number;
  created?: Moment;
  muter?: IPerson;
  mutee?: IPerson;
  person?: IPerson;
}

export class Mute implements IMute {
  constructor(public id?: number, public created?: Moment, public muter?: IPerson, public mutee?: IPerson, public person?: IPerson) {}
}
