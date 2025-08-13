"use client";

import type React from "react";

import { useWeather } from "@/api/weather";
import { SearchForm } from "@/components/SearchForm";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const { weather, loading, error, searchWeather } = useWeather();

  const [savedCities, setSavedCities] = useState<{ [name: string]: any }>({});
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("savedCities");
    if (stored) setSavedCities(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
  }, [savedCities]);

  useEffect(() => {
    if (weather && weather.name && !error) {
      setSavedCities((prev) => ({
        ...prev,
        [weather.name]: weather,
      }));
    }
  }, [weather, error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchWeather(city);
    setSelectedCity(null);
  };


  return (
    <div className="min-h-screen p-4 bg-[#EDEFF2]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-black mb-2 flex items-center justify-center gap-3">
            <Sun className="text-yellow-300" size={50} />
            Galaxy Weather
          </h1>
          <p className="text-gray-800 text-lg">
            Consulta el estado meteorológico de cualquier ciudad
          </p>
        </div>

        <SearchForm
          city={city}
          onCityChange={setCity}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />

        {!weather && loading && (
          <div className="text-center text-gray-500 mt-8">
            <p>Cargando...</p>
          </div>
        )}

        {!weather && !loading && !error && (
          <div className="text-center text-gray-500 mt-8">
            <p>Ingresa el nombre de una ciudad para ver el clima.</p>
          </div>
        )}

        {weather && <WeatherDisplay weather={weather} />}

      </div>
    </div>
  );
}
