import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { workflowRouter } from './routes';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/workflow', workflowRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
