import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { readFileFs } from '../utils/readWriteFile';
import makeCall from '../utils/validateTojen';

let directoryFiles = './../simulatedDatabases/files.json';
let directoryFilesTemp = 'C:/Users/kevin/Desktop/uniminuto-proyect/proyect-backend/src/temp/';

export const download = async (req: any, res: any) => {
  const token = req.headers['authorization'];

  const { status, message, user }: any = await makeCall(token);

  const { _id } = req.query;

  console.log(_id);

  let filesContent: any = await readFileFs(directoryFiles);
  const count = filesContent.length;

  if (count == 0) {
    res.status(400).json({ status: 400, message: 'No se encontro el archivo solicitado' });
  }

  filesContent = JSON.parse(filesContent).filter((id: any) => id._id == _id);

  let idOTC = user.employeeId.toString();

  let pathFile = path.join(directoryFilesTemp, idOTC, filesContent[0].fileName);

  let filename = path.join(filesContent[0].fileName);
  res.set('Content-disposition', 'attachment; filename=' + filename);
  res.set('Content-Type', path.extname(pathFile));
  res.download(pathFile, filename);
};

export const counter = async (req: any, res: any) => {
  const token = req.headers['authorization'];

  const { status, message, user }: any = await makeCall(token);

  let filesContent: any = await readFileFs(directoryFiles);
  const count = filesContent.length;

  if (count == 0) {
    res.status(400).json({ status: 400, message: 'No se encontraron archivos' });
    return;
  }

  filesContent = JSON.parse(filesContent).filter((id: any) => id.user_create == user._id);

  res.status(200).json({ status: 201, filesContent });
};
