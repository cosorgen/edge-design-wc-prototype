import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import session from 'express-session';
import {
  suggest,
  proxy,
  metadata,
  weather,
  imageOfTheDay,
  chat,
  paletteGen,
} from './api/index.js';
import { protectRoute, signInRoute } from './auth/index.js';
import pkg from '../package.json';

// Load .env file for keys
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
const pubDir = path.join(__dirname, process.env.PUBLIC_DIR || 'public');
const protectedRoutes = JSON.parse(
  process.env.PROTECTED_ROUTES || '[]',
) as Array<{
  route: string;
  pass: string;
}>;

// for parsing application/json in api requests
app.use(express.json());

// Handle GET API requests
app.get('/api/weather', weather);
app.get('/api/suggest', suggest);
app.get('/api/proxy', proxy);
app.get('/api/metadata', metadata);
app.get('/api/image-of-the-day', imageOfTheDay);
app.get('/api/palette-gen', paletteGen);
app.post('/api/chat', chat);
app.get('/health', (req, res) => {
  res.send({
    status: 'ok',
    statusCode: 200,
    version: pkg.version,
    publicDir: pubDir,
    port: PORT,
    protectedRoutes: protectedRoutes.map((route) => route.route),
    secure: process.env.SESSION_SECURE_COOKIE === 'true',
  });
});

// Configure protected routes
if (protectedRoutes.length > 0) {
  if (!process.env.SESSION_SECRET) {
    console.error('Missing session secret.');
    process.exit(1);
  }

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      proxy: process.env.SESSION_SECURE_COOKIE === 'true',
      cookie: {
        secure: process.env.SESSION_SECURE_COOKIE === 'true',
        maxAge: parseInt(process.env.SESSION_MAX_AGE || '7200000'), // two hours
      },
    }),
  );

  // Parse request body for signin form
  app.use(express.urlencoded({ extended: true }));

  // Add protected routes
  for (const { route, pass } of protectedRoutes) {
    app.get(route, protectRoute(route), (req, res) => {
      res.sendFile(path.join(pubDir, route));
    });
    app.post(route, signInRoute(route, pass));
  }
}

// Serve static files
console.log(`Serving static files from ${pubDir}.`);
app.use('/', express.static(pubDir));

app.listen(PORT, () =>
  console.log(`Edge UX Server v${pkg.version} listening on port ${PORT}.`),
);
