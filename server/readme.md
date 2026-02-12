# Edge UX Server

Edge UX's prototype server. Used in `edge-ux`, `edge-ux-public` and `edge-design-wc-prototype`.

# Getting Started

Set up the enviroment by adding a .env to the root of the project with the followoing:

```ini
PUBLIC_DIR='public'
BING_APP_ENDPOINT='https://www.bingapis.com/api/v7'
BING_APP_ID='<id>'
IMAGE_OF_THE_DAY_API_ENDPOINT='https://www.bing.com/HPImageArchive.aspx'
WEATHER_APP_ENDPOINT='https://api.openweathermap.org/data/2.5/weather'
WEATHER_APP_ID='<id>'
PROXY_API_ENDPOINT='https://puppeteer-proxy.blackplant-1370c689.westus2.azurecontainerapps.io'
PROXY_API_KEY='<key>'
OPENAI_API_ENDPOINTS= '[
    {
        "url": "https://edge-design-prototype.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview",
        "key": "<key>"
    },
    {
        "url": "https://central-us-edge-prototype.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview",
        "key": "<key>"
    },
    {
        "url": "https://japan-edge-prototype.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview",
        "key": "<key>"
    },
    {
        "url": "https://poland-edge-proto.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview",
        "key": "<key>"
    }
]'
```

Optionally for protected routes add the following to the .env file:

```ini
PROTECTED_ROUTES='[
    {
        "route":"<route relative to public dir>",
        "pass":"<password>"
    }
]'
SESSION_SECRET='<generate a strong secret>'
SESSION_SECURE_COOKIE='<false for http/localhost, true for https>'
SESSION_MAX_AGE='<max age for session in ms>'
```

From the root of the project run

```bash
npm i
npm run dev
```

A browser window will open with the running server. Each change to the source code triggers a rebuild and restarts the server. Any cached data will be cleared, signin sessions will be cleared.

To build for production:

```bash
npm run build
```
