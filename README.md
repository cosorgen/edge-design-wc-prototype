# Edge Design Web Component Prototype

## Setup

You need to add a .env file to the root of the project with the following:

```bash
PORT='4000'
PUBLIC_DIR='www'
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

Then run the following

```bash
npm install
npm run build:packages
npm run dev
```

http://localhost:4000 should automatically open and refresh to see your work.
