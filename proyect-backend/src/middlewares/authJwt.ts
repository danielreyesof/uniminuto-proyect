import jwt from 'jsonwebtoken';
import config from './../config';
import { User } from './../interfaces/global';
import { readFileFs } from './../utils/readWriteFile';

interface JwtPayload {
  id: any;
}

let directoryBL = './../simulatedDatabases/bltokens.json';
let directory = './../simulatedDatabases/users.json';

export const verifyToken = async (req: any, res: any) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ status: 403, message: 'No token provided' });

    const tokensJson = await readFileFs(directoryBL);

    const blListed: [] = JSON.parse(tokensJson).filter((fil: any) => fil.token == token);
    if (blListed.length >= 1) return res.status(403).json({ status: 403, message: 'This session does not exist' });

    const decoded = jwt.verify(token, config.secret!) as JwtPayload;
    req.user_id = decoded.id;

    const usersJson = await readFileFs(directory);
    const userFound = JSON.parse(usersJson)
      .filter((fil: User) => fil._id == req.user_id)
      .map((res: any) => {
        delete res.password;
        return res;
      });

    if (userFound.length == 0) return res.status(403).json({ message: 'No user found' });

    return res.status(200).json({ status: 200, message: 'Authorized', user: userFound[0] });
  } catch (error: any) {
    return res.status(401).json({ status: 401, message: `Unauthorized ${error.message}` });
  }
};
