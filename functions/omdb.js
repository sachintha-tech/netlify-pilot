const fetch = require("node-fetch"); // Netlify function runtime requires node-fetch

const API_KEY = process.env.OMDB_API_KEY;

exports.handler = async function(event, context) {
    const title = event.queryStringParameters.title;

    if (!title) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing title parameter" })
        };
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(title)}`);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch from OMDb", details: err.message })
        };
    }
};
