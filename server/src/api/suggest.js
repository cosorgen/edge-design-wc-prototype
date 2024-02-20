import fetch from 'node-fetch';
import NodeCache from 'node-cache';
import NodeCron from 'node-cron';
import throwServerError, { ServerError } from './utils.js';
const cache = new NodeCache();
NodeCron.schedule('0 0 * * *', () => {
    const { vsize, ksize } = cache.getStats();
    const cacheSize = (vsize + ksize) * 0.000001;
    if (cacheSize > 128)
        cache.flushAll();
});
async function fetchBingSuggestions(query) {
    return (fetch(`https://www.bingapis.com/api/v7/suggestions?appid=${process.env.BING_APP_ID}&q=${encodeURIComponent(query)}`)
        .then((text) => text.json())
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((json) => {
        if (json._type === 'ErrorResponse' &&
            json.errors[0].code === 'RateLimitExceeded')
            throwServerError('Bing autosuggest API rate limit exceeded', 429);
        const results = [];
        const rawSuggestions = json.suggestionGroups[0].searchSuggestions || [];
        rawSuggestions.forEach((suggestion) => {
            results.push({
                type: 'search',
                title: suggestion.displayText,
                value: suggestion.url,
            });
        });
        return results;
    }));
}
function fetchBingEntities(suggestions) {
    const results = [];
    let fullyEnhanced = true;
    for (let x = 0; x < suggestions.length; x += 1) {
        results[x] = suggestions[x];
        // Check if cached
        const cached = cache.get(suggestions[x].title);
        if (cached !== undefined) {
            results[x] = cached;
        }
        else {
            // If not, fetch from Bing and cache it async
            fullyEnhanced = false;
            fetch(`https://www.bingapis.com/api/v7/search?appid=${process.env.BING_APP_ID}&q=${encodeURIComponent(suggestions[x].title)}&responseFilter=entities&count=1`)
                .then((r) => r.json())
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .then((json) => {
                if (json._type === 'ErrorResponse' &&
                    json.errors[0].code === 'RateLimitExceeded')
                    console.error('Bing search API rate limit exceeded'); // no return status since it's async
                let resultToCache = results[x];
                if (json.entities) {
                    const entity = json.entities.value[0] || {};
                    if (entity.entityPresentationInfo.entityScenario ===
                        'DominantEntity' &&
                        entity.name.toLowerCase() === suggestions[x].title.toLowerCase()) {
                        // Cache result
                        resultToCache = {
                            type: 'entity',
                            title: entity.name,
                            value: entity.webSearchUrl,
                            entityImage: entity.image
                                ? entity.image.thumbnailUrl
                                : undefined,
                            subtitle2: entity.entityPresentationInfo.entityTypeDisplayHint,
                        };
                    }
                }
                // Cache result
                cache.set(suggestions[x].title, resultToCache);
            });
        }
    }
    return [results, fullyEnhanced];
}
export default async (req, res) => {
    try {
        const { q, enhance } = req.query;
        if (q === undefined)
            throwServerError('Missing query parameter "q"', 400);
        if (process.env.BING_APP_ID === undefined)
            throwServerError('Missing BING_APP_ID environment variable', 500);
        let suggestions = await fetchBingSuggestions(q);
        let fullyEnhanced = true;
        if (enhance === 'true')
            [suggestions, fullyEnhanced] = fetchBingEntities(suggestions);
        if (fullyEnhanced)
            res.set('Cache-Control', 'public, max-age=86400'); // one day
        return res.json({ q, suggestions });
    }
    catch (err) {
        console.error(err);
        const serverError = err;
        if (serverError instanceof ServerError) {
            return res.sendStatus(serverError.statusCode || 500);
        }
    }
};
