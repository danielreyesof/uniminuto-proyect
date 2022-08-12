import bcrypt from 'bcryptjs';
import { readFileFs, writeFileFs } from '../utils/readWriteFile';
import jwt from 'jsonwebtoken';
import config from '../config';
import { generateUUID } from '../utils/generateUUID';

let directory = './../simulatedDatabases/users.json';
let directoryRole = './../simulatedDatabases/roles.json';

export const signup = async (req: any, res: any) => {
  const { name, lastname, username, email, password, roles } = req.body;

  let newUser = new Object({
    _id: generateUUID(),
    name,
    lastname,
    username,
    email,
    password: await encryptPassword(password),
    status: 1,
    date_create: Date.now(),
    date_update: Date.now(),
    date_delete: null,
  });

  const fileContents: any = await readFileFs(directoryRole);

  if (roles) {
    let rolesArr: [] = JSON.parse(fileContents).filter((fil: any) => roles.indexOf(fil.name) > -1);
    newUser = { ...newUser, roles: rolesArr.map((role: any) => role._id) };
  } else {
    let rolesArr: [] = JSON.parse(fileContents).filter((fil: any) => fil.name == 'client');
    newUser = { ...newUser, roles: rolesArr.map((role: any) => role._id) };
  }

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
  const { name, lastname, username, email, password, roles } = req.body;

  let newUser = new Object({
    _id: generateUUID(),
    name,
    lastname,
    username,
    email,
    password: await encryptPassword(password),
    status: 1,
    date_create: Date.now(),
    date_update: Date.now(),
    date_delete: null,
  });

  const fileContents: any = await readFileFs(directoryRole);

  if (roles) {
    let rolesArr: [] = JSON.parse(fileContents).filter((fil: any) => roles.indexOf(fil.name) > -1);
    newUser = { ...newUser, roles: rolesArr.map((role: any) => role._id) };
  } else {
    let rolesArr: [] = JSON.parse(fileContents).filter((fil: any) => fil.name == 'client');
    newUser = { ...newUser, roles: rolesArr.map((role: any) => role._id) };
  }

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

export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, recievedPassword: string) => {
  return await bcrypt.compare(password, recievedPassword);
};
