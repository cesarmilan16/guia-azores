const fetch = require('node-fetch');

exports.handler = async (event) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const { city, lat, lon } = event.queryStringParameters;

    try {
        let url;

        // Construir la URL en función de los parámetros recibidos
        if (lat && lon) {
            url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;
        } else if (city) {
            url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Se requieren parámetros "city" o "lat" y "lon"' }),
            };
        }

        const response = await fetch(url);

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error('Error al obtener datos del pronóstico');
        }

        // Parsear los datos JSON de la respuesta
        const data = await response.json();

        // Retornar los datos obtenidos de la API
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener la previsión' }),
        };
    }
};
