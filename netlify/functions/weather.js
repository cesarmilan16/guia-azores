const fetch = require('node-fetch');

exports.handler = async (event) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const { city, lat, lon } = event.queryStringParameters;

    try {
        let url;

        // Construir la URL en función de los parámetros recibidos
        if (lat && lon) {
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;
        } else if (city) {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Se requieren parámetros "city" o "lat" y "lon"' }),
            };
        }

        const response = await fetch(url);

        if (!response.ok) throw new Error('Error al obtener datos del clima');

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error(error);
        console.log('API Key:', apiKey);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener el clima' }),
        };
    }
};
