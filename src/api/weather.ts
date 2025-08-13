import type { WeatherData } from "@/interfaces/weather-data";
import { useState } from "react";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");

    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

      if (!API_KEY) {
        throw new Error("API key no configurada");
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!response.ok) {
        const status = response.status;
        if (status === 404) {
          throw new Error("Ciudad no encontrada");
        } else if (status === 401) {
          throw new Error("API key inválida");
        } else {
          throw new Error(`Error del servidor: ${status}`);
        }
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al obtener datos meteorológicos"
      );
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, searchWeather };
};
