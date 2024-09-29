export enum UserRole {
  INVESTOR = 'INVESTOR',
  BROKER = 'BROKER',
}

export interface IUserRole {
  _id?: string;
  title: UserRole;
}
