import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { validateCity, justLetters } from "./utils/validations-methos";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = "c739c7e15efc9e7730b2f870cecf5c66";

  const getWeather = async () => {
    const validationError = validateCity(city);

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      if (err.message == "Failed to fetch") {
        setError("No internet connection");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center mb-4">🌤 Weather App</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Write any place"
              value={city}
              onChange={(e) => {
                if (!justLetters(e.target.value)) {
                  setCity("");
                  return;
                }
                setCity(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && getWeather()}
            />
            <button className="btn btn-primary" onClick={getWeather}>
              Search
            </button>
          </div>
          {loading && <p className="text-center">Loading...</p>}
          {error.length > 0 && <div className="alert alert-danger">{error}</div>}
          {weather && (
            <div className="card text-center shadow">
              <div className="card-body">
                <h2 className="card-title">{weather.name}</h2>
                <p className="display-4">{Math.round(weather?.main?.temp)}°C</p>
                <p className="text-capitalize text-muted">
                  {weather?.weather[0].description}
                </p>
                <div className="row mt-3">
                  <div className="col">
                    <strong>Humedad</strong>
                    <p>{weather?.main?.humidity}%</p>
                  </div>
                  <strong>Viento</strong>
                  <p>{weather?.wind?.speed} m/s</p>
                  <strong>Sensación</strong>
                  <p>{Math.round(weather?.main?.feels_like)}°C</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;