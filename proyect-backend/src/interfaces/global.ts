interface audit {
  _id: string;
  status: Number;
  date_create: Date;
  date_update: Date;
  date_delete: Date;
}

interface role extends audit {
  name: string;
}

export interface User {
  _id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  status: number;
  date_create: number;
  date_update: number;
  date_delete: null;
  roles: string[];
}
