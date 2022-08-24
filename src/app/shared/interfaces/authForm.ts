export interface TypeForm {
  id: string;
  label: string;
}

export interface UserInfo {
  status: number;
  message: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  status: number;
  date_create: number;
  date_update: number;
  date_delete: null;
}
