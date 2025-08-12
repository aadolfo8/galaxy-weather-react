"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { WeatherData } from "@/interfaces/weather-data";
import { MapPin, Search, Sun } from "lucide-react";
import { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");

    try {
      const API_KEY =
        import.meta.env.VITE_OPENWEATHER_API_KEY || "TU_API_KEY_AQUI";

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric&lang=es`
      );

      if (!response.ok) {
        throw new Error("Ciudad no encontrada");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchWeather();
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-black mb-2 flex items-center justify-center gap-3">
            <Sun className="text-yellow-300" size={50} />
            Galaxy Weather
          </h1>
          <p className="text-gray-800 text-lg">
            Consulta el estado meteorológico de cualquier ciudadd
          </p>
        </div>

        <Card className="mb-8 shadow-lg border-0">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <div className="flex-1 relative">
                <MapPin
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Ingresa el nombre de una ciudad..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 border-gray-300 rounded-md focus:border-blue-200 focus:ring-2 focus:ring-blue-200 transition-colors"
                />
              </div>
              <Button
                type="submit"
                disabled={loading || !city.trim()}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <Search className="mr-2" size={20} />
                    Buscar
                  </>
                )}
              </Button>
            </form>
            {error && (
              <p className="text-pink-500 mt-5 text-center font-medium">
                {error}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
