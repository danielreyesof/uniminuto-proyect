import pdf from 'html-pdf';
import fs from 'fs';
import * as path from 'path';
import pdfTemplate from '../templates/pdf-template.controller';
import { generateUUID } from './../utils/generateUUID';
import { readFileFs, writeFileFs } from '../utils/readWriteFile';
import { verifyToken } from '../middlewares/authJwt';
import makeCall from '../utils/validateTojen';

let directoryCreate = './../temp/';
let directoryFiles = './../simulatedDatabases/files.json';

let options: any = { format: 'Letter' };

export const generate = async (req: any, res: any) => {
  let uid = generateUUID();
  const token = req.headers['authorization'];

  const { user }: any = await makeCall(token);

  console.log(user);

  req.body.uid = uid;
  let html = pdfTemplate(req.body, user);

  let fileName = `yottaCertificacionServicios_${user.employeeId}_${uid}.pdf`;
  let fullpath = path.join(__dirname, `${directoryCreate}/${user.employeeId}/${fileName}`);

  let fileinfo = {
    _id: generateUUID(),
    fileName,
    path: fullpath,
    date_create: new Date(),
    user_create: user._id,
  };

  const fileContentsUsers: any = await readFileFs(directoryFiles);
  const count = fileContentsUsers.length;

  let savedFile: any;

  pdf.create(html, options).toFile(fullpath, async function () {
    if (count == 0) {
      savedFile = await writeFileFs(directoryFiles, [fileinfo]);
      res.status(200).json({ status: 200, test: fullpath });
    } else {
      let content: any = await readFileFs(directoryFiles);
      content = JSON.parse(content);
      content.push(fileinfo);
      savedFile = await writeFileFs(directoryFiles, content);
      res.status(200).json({ status: 200, test: fullpath });
    }
  });
};
