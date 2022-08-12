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
