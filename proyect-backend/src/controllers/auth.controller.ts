import bcrypt from 'bcryptjs';
import { readFileFs, writeFileFs } from '../utils/readWriteFile';
import jwt from 'jsonwebtoken';
import config from './../config';
import { generateUUID } from './../utils/generateUUID';
import { User } from './../interfaces/global';

let directory = './../simulatedDatabases/users.json';
let directoryBL = './../simulatedDatabases/bltokens.json';

export const signup = async (req: any, res: any) => {
  console.log(req.body);

  const { name, lastname, email, password, roles } = req.body;

  let newUser = new Object({
    _id: generateUUID(),
    name,
    lastname,
    email,
    password: await encryptPassword(password),
    roles,
    status: 1,
    date_create: Date.now(),
    date_update: Date.now(),
    date_delete: null,
  });

  const fileContentsUsers: any = await readFileFs(directory);
  const count = fileContentsUsers.length;

  let savedUser: any;

  if (count == 0) {
    savedUser = await writeFileFs(directory, [newUser]);
  } else {
    let content: any = await readFileFs(directory);
    content = JSON.parse(content);
    content.push(newUser);
    savedUser = await writeFileFs(directory, content);
  }

  let token = jwt.sign({ id: savedUser._id }, config.secret!, {
    expiresIn: 86400,
  });

  res.status(200).json({ status: 201, token });
};

export const signin = async (req: any, res: any) => {
  const { email, password } = req.body;

  const usersJson = await readFileFs(directory);
  const userFound = JSON.parse(usersJson).filter((fil: User) => fil.email == email);

  if (!userFound) return res.status(400).json({ message: 'Incorrect email or password' });

  const matchPassword = await comparePassword(password, userFound[0].password);
  if (!matchPassword) return res.status(401).json({ token: null, message: 'Incorrect email or password' });

  const token = jwt.sign({ id: userFound[0]._id }, config.secret!, {
    expiresIn: 86400,
  });

  res.status(200).json({ status: 200, token });
};

export const logout = async (req: { headers: { [x: string]: any } }, res: any) => {
  const token = req.headers['authorization'];

  let newToken = new Object({
    _id: generateUUID(),
    token,
    date_create: Date.now(),
  });

  const fileContentsTokens: any = await readFileFs(directoryBL);
  const count = fileContentsTokens.length;

  let savedTokens: any;
  if (count == 0) {
    savedTokens = await writeFileFs(directoryBL, [newToken]);
  } else {
    let content: any = await readFileFs(directoryBL);
    content = JSON.parse(content);
    content.push(newToken);
    savedTokens = await writeFileFs(directoryBL, content);
  }

  res.status(200).json({ status: 200, message: 'Session ended' });
};

export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, recievedPassword: string) => {
  return await bcrypt.compare(password, recievedPassword);
};
