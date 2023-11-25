import React, { useState, useEffect } from 'react';

const SearchWeather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'YOUR_API_KEY';

  const getWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || 'City not found';
        throw new Error(errorMessage);
      }

      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    if (city) {
      getWeatherData();
    }
  }, [city]);

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-white text-center border-0">
              <img
                src="https://source.unsplash.com/600x900/?nature,sunset,cloudy"
                className="card-img"
                alt="..."
              />
              <div className="card-img-overlay">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    getWeatherData();
                    setCity('');
                  }}
                ><h4>Get my weather</h4>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <button type="submit" className="input-group-text" id="basic-addon2">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {weatherData && (
                  <div className='bg-dark bg-opacity-50 py-3'>
                    <h2 className="card-title">
                      {weatherData.name}, {weatherData.sys.country}
                    </h2>
                    <hr />
                    <i className='fas fa-cloud fa-4x'></i>
                    <h1 className='fw-bolder mb-5'>{weatherData.main.temp}&deg;C</h1>
                    <p className='lead'>{weatherData.weather[0].description}</p>
                    <p className='lead'>Humidity: {weatherData.main.humidity}%</p>
                    <p className='lead'>Wind Speed: {weatherData.wind.speed} m/s</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
