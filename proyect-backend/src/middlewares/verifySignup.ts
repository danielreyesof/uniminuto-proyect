import { User } from './../interfaces/global';
import { readFileFs } from './../utils/readWriteFile';

let directory = './../simulatedDatabases/users.json';

export const checkDuplicatedEmail = async (req: { body: { email: any } }, res: any, next: any) => {
  const { email } = req.body;

  const usersJson = await readFileFs(directory);
  const userFound: [] = JSON.parse(usersJson).filter((fil: User) => fil.email == email);
  if (userFound.length >= 1) return res.status(400).json({ status: 400, message: `The email already exists` });

  next();
};
