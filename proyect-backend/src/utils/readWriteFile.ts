import { promises as fsPromises } from 'fs';
import * as path from 'path';

export const readFileFs = async (route: string) =>
  await fsPromises.readFile(path.join(__dirname, route), {
    encoding: 'utf-8',
  });

export const writeFileFs = async (route: string, data: any[]) => {
  await fsPromises.writeFile(path.join(__dirname, route), JSON.stringify(data));

  return data;
};
// await ;
