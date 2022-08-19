import { readFileFs, writeFileFs } from './../utils/readWriteFile';
import { generateUUID } from './../utils/generateUUID';

export const ROLES = ['client', 'admin', 'employee', 'developer'];

export const readFile = async () => {
  try {
    let directory = './../simulatedDatabases/roles.json';
    const fileContents = await readFileFs(directory);

    const count = fileContents.length;
    if (count > 0) return;

    const dataSave: any[] = [];

    ROLES.forEach((rol: string) => {
      dataSave.push({
        _id: generateUUID(),
        name: rol,
        status: 1,
        date_create: Date.now(),
        date_update: Date.now(),
        date_delete: null,
      });
    });

    await writeFileFs(directory, dataSave);
  } catch (err) {
    console.log('error is: ', err);
  }
};
