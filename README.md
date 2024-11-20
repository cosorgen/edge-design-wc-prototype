# Edge Design Web Component Prototype

## Setup

You need to add a .env file to the root of the project with the following:

```bash
BING_APP_ID=ID
WEATHER_APP_ID=ID
PROXY_API_KEY=KEY
OPENAI_API_ENDPOINTS='[
    {
        "url": "",
        "key": ""
    }
]'
```

Then run the following

```bash
npm install
npm run build:packages
npm run dev
```

http://localhost:4000 should automatically open and refresh to see your work.
