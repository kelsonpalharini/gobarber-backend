import express from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.get('/', routes);

app.listen(3333);
