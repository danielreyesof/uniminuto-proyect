import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import pkg from './package.json';
import { readFile } from './src/libs/initialSetup';
import authRoutes from './src/routes/auth.routes';
import pdfRoutes from './src/routes/pdf.routes';
import filesRoutes from './src/routes/files.routes';

const app = express();
readFile();

app.set('pkg', pkg);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Crud
app.get('/', (_req: any, res) => {
  res.json({
    project_name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  });
});

app.use('/api/auth/', authRoutes);
app.use('/api/pdf/', pdfRoutes);
app.use('/api/files/', filesRoutes);

export default app;
