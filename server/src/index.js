import * as dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { suggest, proxy, metadata } from './api/index.js';
dotenv.config(); // Load .env file for keys
const PORT = process.env.PORT || 4000;
const app = express();
const curDirName = dirname(fileURLToPath(import.meta.url));
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(curDirName, '../client/build')));
// Handle GET requests
app.get('/api/suggest', suggest);
app.get('/api/proxy', proxy);
app.get('/api/metadata', metadata);
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(curDirName, '../client/build', 'index.html'));
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
