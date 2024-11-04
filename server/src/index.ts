import * as dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import {
  suggest,
  proxy,
  metadata,
  weather,
  imageOfTheDay,
  chat,
} from './api/index.js';

dotenv.config(); // Load .env file for keys

const PORT = process.env.PORT || 4000;
const app = express();
const pathToApp = path.resolve(__dirname, './www');

// Have Node serve the files for our built app
app.use(express.static(pathToApp));

app.use(express.json()); // for parsing application/json

// Handle GET requests
app.get('/api/weather', weather);
app.get('/api/suggest', suggest);
app.get('/api/proxy', proxy);
app.get('/api/metadata', metadata);
app.get('/api/image-of-the-day', imageOfTheDay);
app.post('/api/chat', chat);

// All other GET requests not handled before will return our app
app.get('*', (req, res) => {
  res.sendFile(pathToApp + '/index.html');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
