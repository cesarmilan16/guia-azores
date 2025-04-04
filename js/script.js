function toggleDropdown(button) {
    // Selecciona el elemento siguiente al botón que se ha pulsado
    let contenido = button.nextElementSibling; 

    // Alterna la clase 'show' solo en ese contenido
    contenido.classList.toggle('show');
}

function toggleMultipleDropdowns(button) {
  // Selecciona el elemento siguiente al botón que se ha pulsado
  let startElement = button.nextElementSibling; 
  
  // Agrega la clase 'show' a los cinco elementos siguientes
  for (let i = 0; i < 5; i++) {
      // Asegúrate de que el siguiente elemento existe
      if (startElement) {
          startElement.classList.toggle('show');
          // Mueve al siguiente elemento
          startElement = startElement.nextElementSibling;
      } else {
          break; // Sale del bucle si no hay más elementos
      }
  }
}


function scrollToElement(elementId, offset = 0) {
    const destino = document.getElementById(elementId);

    if (destino) {
      const posicion = destino.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: posicion,
        behavior: 'smooth'
      });
    }
}

const elementos = document.querySelectorAll('.contenedor__neuroformismo');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Solo una vez
    }
  });
}, {
  threshold: 0.1
});

elementos.forEach(elemento => {
  observer.observe(elemento);
});

// Muestra el botón al hacer scroll
window.addEventListener('scroll', () => {
    const btn = document.getElementById('scrollToTopBtn')
    if (window.scrollY > 300) {
        btn.classList.add("show")
    } else {
        btn.classList.remove("show")
    }
})

// Subir al principio al hacer click
const btn = document.getElementById('scrollToTopBtn')

btn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

// Funciones que cargan cuando cargue la web
window.addEventListener('load', () => {
    // Ciudades y coordenadas
    const cities = ['furnas', 'ribeira grande', 'vila franca do campo', 'ponta delgada']; // Cambia las ciudades aquí
    const cityNordeste = { name: 'Nordeste', lat: 37.7854, lon: -25.2802 }; // Coordenadas de Nordeste
    const citySete = { name: 'Sete Cidades', lat: 37.8566, lon: -25.7552 }; // Coordenadas de Sete
  

    // Función para obtener el clima
    const getWeather = async (city, index) => {
        try {
            // Endpoint
            const response = await fetch(`/.netlify/functions/weather?city=${city}`);
            if (!response.ok) throw new Error('Error al obtener datos del clima');

            const data = await response.json();
            document.getElementById(`temperatura-valor-${index}`).textContent = `${Math.round(data.main.temp)} °C`;
            document.getElementById(`temperatura-descripcion-${index}`).textContent = data.weather[0].description.toUpperCase();
            document.getElementById(`ubicacion-${index}`).textContent = data.name;
            document.getElementById(`viento-velocidad-${index}`).textContent = `${data.wind.speed} m/s`;

            const icono = document.getElementById(`icono-animado-${index}`);
            switch (data.weather[0].main) {
                case 'Thunderstorm':
                    icono.src = 'animated/thunder.svg';
                    break;
                case 'Drizzle':
                    icono.src = 'animated/rainy-2.svg';
                    break;
                case 'Rain':
                    icono.src = 'animated/rainy-7.svg';
                    break;
                case 'Snow':
                    icono.src = 'animated/snowy-6.svg';
                    break;
                case 'Clear':
                    icono.src = 'animated/day.svg';
                    break;
                case 'Clouds':
                    icono.src = 'animated/cloudy-day-1.svg';
                    break;
                default:
                    icono.src = 'animated/weather.svg';
            }
        } catch (error) {
            console.error(`Error al obtener el clima de ${city}:`, error);
        }
    };

    // Obtener el clima para cada ciudad
    cities.forEach((city, index) => {
        getWeather(city, index + 1); // Pasar el índice (1, 2, 3, 4)
    });

    // Función para obtener el clima de Nordeste
    const getWeatherNordeste = async () => {
        try {
            // Endpoint
            const response = await fetch(`/.netlify/functions/weather?lat=${cityNordeste.lat}&lon=${cityNordeste.lon}`);
            if (!response.ok) throw new Error('Error al obtener datos del clima');

            const data = await response.json();
            // Mostrar los datos en el DOM
            document.getElementById('temperatura-valor').textContent = `${Math.round(data.main.temp)} °C`;
            document.getElementById('temperatura-descripcion').textContent = data.weather[0].description.toUpperCase();
            document.getElementById('ubicacion').textContent = cityNordeste.name; // Usar el nombre de la ciudad
            document.getElementById('viento-velocidad').textContent = `${data.wind.speed} m/s`;

            // Cambiar el icono animado según el clima
            const icono = document.getElementById('icono-animado');
            switch (data.weather[0].main) {
                case 'Thunderstorm':
                    icono.src = 'animated/thunder.svg';
                    break;
                case 'Drizzle':
                    icono.src = 'animated/rainy-2.svg';
                    break;
                case 'Rain':
                    icono.src = 'animated/rainy-7.svg';
                    break;
                case 'Snow':
                    icono.src = 'animated/snowy-6.svg';
                    break;
                case 'Clear':
                    icono.src = 'animated/day.svg';
                    break;
                case 'Atmosphere':
                    icono.src = 'animated/weather.svg';
                    break;
                case 'Clouds':
                    icono.src = 'animated/cloudy-day-1.svg';
                    break;
                default:
                    icono.src = 'animated/weather.svg';
            }
            } catch (error) {
                console.error(`Error al obtener el clima de ${cityNordeste.name}:`, error);
            }
    };

    // Obtener el clima para la ciudad Nordeste
    getWeatherNordeste();

    // Función para obtener el clima de Sete
    const getWeatherSete = async () => {
        try {
            // Endpoint
            const response = await fetch(`/.netlify/functions/weather?lat=${citySete.lat}&lon=${citySete.lon}`);
            if (!response.ok) throw new Error('Error al obtener datos del clima');

            const data = await response.json();
                // Mostrar los datos en el DOM
                document.getElementById('temperatura-valor-sete').textContent = `${Math.round(data.main.temp)} °C`;
                document.getElementById('temperatura-descripcion-sete').textContent = data.weather[0].description.toUpperCase();
                document.getElementById('ubicacion-sete').textContent = citySete.name; // Usar el nombre de la ciudad
                document.getElementById('viento-velocidad-sete').textContent = `${data.wind.speed} m/s`;

                // Cambiar el icono animado según el clima
                const icono = document.getElementById('icono-animado-sete');
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                        icono.src = 'animated/thunder.svg';
                        break;
                    case 'Drizzle':
                        icono.src = 'animated/rainy-2.svg';
                        break;
                    case 'Rain':
                        icono.src = 'animated/rainy-7.svg';
                        break;
                    case 'Snow':
                        icono.src = 'animated/snowy-6.svg';
                        break;
                    case 'Clear':
                        icono.src = 'animated/day.svg';
                        break;
                    case 'Atmosphere':
                        icono.src = 'animated/weather.svg';
                        break;
                    case 'Clouds':
                        icono.src = 'animated/cloudy-day-1.svg';
                        break;
                    default:
                        icono.src = 'animated/weather.svg';
                }
            }
            catch(error) {
                console.error(`Error al obtener el clima de ${citySete.name}:`, error);
            };
    };

    // Obtener el clima para la ciudad Sete
    getWeatherSete();

    const obtenerPrevisionNordeste = async () => {
        try {
            // Endpoint
            const response = await fetch(`/.netlify/functions/forecast?lat=${cityNordeste.lat}&lon=${cityNordeste.lon}`);
            if (!response.ok) throw new Error('Error al obtener datos del clima');

            const data = await response.json();
            const forecastList = data.list;
            const forecastContainer = document.getElementById('prevision-nordeste');
            forecastContainer.innerHTML = ''; // Limpiar el contenido anterior

            // Crear un objeto para agrupar las previsiones por día
            const dailyForecasts = {};

            forecastList.forEach(forecast => {
                const date = new Date(forecast.dt * 1000); // Convertir timestamp a fecha
                const day = date.toLocaleDateString('es-ES', { weekday: 'long'}); 

                // Tomar la primera previsión disponible para cada día
                if (!dailyForecasts[day]) {
                    dailyForecasts[day] = forecast;
                }
            });

            // Mostrar las previsiones agrupadas por días
            if (Object.keys(dailyForecasts).length > 0) {
                Object.keys(dailyForecasts).forEach(day => {
                    const forecast = dailyForecasts[day];
                    const temp = `${Math.round(forecast.main.temp)} °C`;
                    const description = forecast.weather[0].description.toUpperCase();
                    const windSpeed = `${forecast.wind.speed} m/s`;

                    // Crear elementos HTML para mostrar la previsión por día
                    const forecastElement = document.createElement('div');
                    forecastElement.classList.add('forecast');
                    forecastElement.innerHTML = `
                        <h4>${day}</h4>
                        <p class="forecast-tiempo"><strong>Temperatura:</strong> ${temp}</p>
                        <p>${description}</p>
                        <img class='icono-animado' src='' alt='icono clima' style='width: 32px; height:32px auto;' />
                        <p><strong>Viento:</strong> ${windSpeed}</p>
                    `;
                    // Cambiar el icono animado según el clima
                    // Seleccionar el icono del clima
                    const iconElement = forecastElement.querySelector('.icono-animado'); 
                    switch (forecast.weather[0].main) {
                    case 'Thunderstorm':
                        iconElement.src = 'animated/thunder.svg';
                        break;
                    case 'Drizzle':
                        iconElement.src = 'animated/rainy-2.svg';
                        break;
                    case 'Rain':
                        iconElement.src = 'animated/rainy-7.svg';
                        break;
                    case 'Snow':
                        iconElement.src = 'animated/snowy-6.svg';
                        break;
                    case 'Clear':
                        iconElement.src = 'animated/day.svg';
                        break;
                    case 'Atmosphere':
                        iconElement.src = 'animated/weather.svg';
                        break;
                    case 'Clouds':
                        iconElement.src = 'animated/cloudy-day-1.svg';
                        break;
                    default:
                        iconElement.src = 'animated/cloudy-day-1.svg';
                }
                    forecastContainer.appendChild(forecastElement);
                });

            
            } else {
                console.log("No se encontraron previsiones a mostrar.");
            }
        } catch(error) {
            console.error("Error al obtener la previsión:", error);
        };
    };

    // Obtener la previsión del clima para Nordeste
    obtenerPrevisionNordeste();

    const obtenerPrevisionSete = async () => {
        try {
            // Endpoint
            const response = await fetch(`/.netlify/functions/forecast?lat=${citySete.lat}&lon=${citySete.lon}`);
            if (!response.ok) throw new Error('Error al obtener datos del clima');

            const data = await response.json();
            const forecastList = data.list;
            const forecastContainer = document.getElementById('prevision-sete');
            forecastContainer.innerHTML = ''; // Limpiar el contenido anterior

            // Crear un objeto para agrupar las previsiones por día
            const dailyForecasts = {};

            forecastList.forEach(forecast => {
                const date = new Date(forecast.dt * 1000); // Convertir timestamp a fecha
                const day = date.toLocaleDateString('es-ES', { weekday: 'long'}); 

                // Tomar la primera previsión disponible para cada día
                if (!dailyForecasts[day]) {
                    dailyForecasts[day] = forecast;
                }
            });

            // Mostrar las previsiones agrupadas por días
            if (Object.keys(dailyForecasts).length > 0) {
                Object.keys(dailyForecasts).forEach(day => {
                    const forecast = dailyForecasts[day];
                    const temp = `${Math.round(forecast.main.temp)} °C`;
                    const description = forecast.weather[0].description.toUpperCase();
                    const windSpeed = `${forecast.wind.speed} m/s`;

                    // Crear elementos HTML para mostrar la previsión por día
                    const forecastElement = document.createElement('div');
                    forecastElement.classList.add('forecast');
                    forecastElement.innerHTML = `
                        <h4>${day}</h4>
                        <p class="forecast-tiempo"><strong>Temperatura:</strong> ${temp}</p>
                        <p>${description}</p>
                        <img class='icono-animado' src='' alt='icono clima' style='width: 32px; height:32px auto;' />
                        <p><strong>Viento:</strong> ${windSpeed}</p>
                    `;
                    // Cambiar el icono animado según el clima
                    // Seleccionar el icono del clima
                    const iconElement = forecastElement.querySelector('.icono-animado'); 
                    switch (forecast.weather[0].main) {
                    case 'Thunderstorm':
                        iconElement.src = 'animated/thunder.svg';
                        break;
                    case 'Drizzle':
                        iconElement.src = 'animated/rainy-2.svg';
                        break;
                    case 'Rain':
                        iconElement.src = 'animated/rainy-7.svg';
                        break;
                    case 'Snow':
                        iconElement.src = 'animated/snowy-6.svg';
                        break;
                    case 'Clear':
                        iconElement.src = 'animated/day.svg';
                        break;
                    case 'Atmosphere':
                        iconElement.src = 'animated/weather.svg';
                        break;
                    case 'Clouds':
                        iconElement.src = 'animated/cloudy-day-1.svg';
                        break;
                    default:
                        iconElement.src = 'animated/cloudy-day-1.svg';
                }
                    forecastContainer.appendChild(forecastElement);
                });
                
                } else {
                    console.log("No se encontraron previsiones a mostrar.");
                }
            } catch(error) {
                console.error("Error al obtener la previsión:", error);
            };
    };

    // Obtener la previsión del clima para Sete
    obtenerPrevisionSete();

    // Obtener previsión para las demás ciudades
    const obtenerPrevision = async (city, index) => {
        try {
            // Endpoint
            const response = await fetch(`/.netlify/functions/forecast?city=${city}`);
            if (!response.ok) throw new Error('Error al obtener datos del clima');

            const data = await response.json();
            const forecastList = data.list; // Lista con previsiones de 5 días (cada 3 horas)
            const forecastContainer = document.getElementById(`prevision-${index}`);
            forecastContainer.innerHTML = ''; // Limpiar el contenido anterior

            // Crear un objeto para agrupar las previsiones por día
            const dailyForecasts = {};

            forecastList.forEach(forecast => {
                const date = new Date(forecast.dt * 1000); // Convertir timestamp a fecha
                const day = date.toLocaleDateString('es-ES', { weekday: 'long' });

                // Tomar la primera previsión disponible para cada día
                if (!dailyForecasts[day]) {
                    dailyForecasts[day] = forecast;
                }
            });

            // Mostrar las previsiones agrupadas por día
            if (Object.keys(dailyForecasts).length > 0) {
                Object.keys(dailyForecasts).forEach(day => {
                    const forecast = dailyForecasts[day];
                    const temp = `${Math.round(forecast.main.temp)} °C`;
                    const description = forecast.weather[0].description.toUpperCase();
                    const windSpeed = `${forecast.wind.speed} m/s`;

                    // Crear elementos HTML para mostrar la previsión por día
                    const forecastElement = document.createElement('div');
                    forecastElement.classList.add('forecast');
                    forecastElement.innerHTML = `
                        <h4>${day}</h4>
                        <p class="forecast-tiempo"><strong>Temperatura:</strong> ${temp}</p>
                        <p>${description}</p>
                        <img class='icono-animado' src='' alt='icono clima' style='width: 32px; height:32px;' />
                        <p><strong>Viento:</strong> ${windSpeed}</p>
                    `;

                    // Seleccionar el icono del clima
                    const iconElement = forecastElement.querySelector('.icono-animado');
                    switch (forecast.weather[0].main) {
                        case 'Thunderstorm':
                            iconElement.src = 'animated/thunder.svg';
                            break;
                        case 'Drizzle':
                            iconElement.src = 'animated/rainy-2.svg';
                            break;
                        case 'Rain':
                            iconElement.src = 'animated/rainy-7.svg';
                            break;
                        case 'Snow':
                            iconElement.src = 'animated/snowy-6.svg';
                            break;
                        case 'Clear':
                            iconElement.src = 'animated/day.svg';
                            break;
                        case 'Atmosphere':
                            iconElement.src = 'animated/weather.svg';
                            break;
                        case 'Clouds':
                            iconElement.src = 'animated/cloudy-day-1.svg';
                            break;
                        default:
                            iconElement.src = 'animated/cloudy-day-1.svg';
                    }

                    forecastContainer.appendChild(forecastElement);
                });
            } else {
                console.log("No se encontraron previsiones a mostrar.");
            }
        } catch(error) {
            console.error(`Error al obtener la previsión para ${city}:`, error);
        };
    };

    // Obtener el clima para cada ciudad y crear los contenedores dinámicamente
    cities.forEach((city, index) => {
    // Crear un contenedor dinámico para cada ciudad
    const forecastContainer = document.createElement('div');
    forecastContainer.id = `prevision-${index + 1}`;
    document.body.appendChild(forecastContainer); // Añade el contenedor al body

    // Llamar a la función para obtener la previsión del clima
    obtenerPrevision(city, index + 1); // Pasar el índice (1, 2, 3, 4, 5)
    });
});
