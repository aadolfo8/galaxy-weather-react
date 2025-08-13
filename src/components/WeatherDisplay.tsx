import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WeatherData } from "@/interfaces/weather-data";
import {
    CircleQuestionMark,
    Droplets,
    Eye,
    Gauge,
    Thermometer,
    Wind,
} from "lucide-react";
import React from "react";

interface WeatherDisplayProps {
  weather: WeatherData;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  const getWeatherIcon = (weatherIcon: string) => {
    if (!weatherIcon)
      return <CircleQuestionMark size={50} className="text-red-500" />;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    return <img src={iconUrl} alt={weatherIcon} className={`w-25 h-25`} />;
  };

  return (
    <>
      <div className="space-y-6">
        {/* Tarjeta principal del clima */}
        <Card className="shadow-xl border-0 overflow-hidden p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-1">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-gray-700 text-lg capitalize">
                {weather.weather[0].description}
              </p>
            </div>
            <div className="text-center">
              {getWeatherIcon(weather.weather[0].icon)}
            </div>
          </div>

          <div className="mt-6 flex items-end gap-4">
            <div className="text-6xl font-bold">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="text-gray-700 mb-2">
              <div>Sensación: {Math.round(weather.main.feels_like)}°C</div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Detalles de temperatura */}

          <Card className="shadow-xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Thermometer className="text-red-500" size={24} />
                Temperatura
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="font-medium text-gray-700">Máxima</span>
                <Badge
                  variant="destructive"
                  className="text-lg px-3 py-1 bg-red-600"
                >
                  {Math.round(weather.main.temp_max)}°C
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-gray-700">Mínima</span>
                <Badge
                  variant="secondary"
                  className="text-lg px-3 py-1 bg-blue-600 text-white"
                >
                  {Math.round(weather.main.temp_min)}°C
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Detalles de viento */}

          <Card className="shadow-xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wind className="text-green-500" size={24} />
                Viento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-700">Velocidad</span>
                <Badge className="text-lg px-3 py-1 bg-green-600">
                  {weather.wind.speed} m/s
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-700">Dirección</span>
                <Badge className="text-lg px-3 py-1 bg-green-600">
                  {weather.wind.deg}°
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Presión */}
          <Card className="shadow-xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gauge className="text-purple-500" size={24} />
                Presión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {weather.main.pressure}
                </div>
                <div className="text-gray-600">hPa</div>
              </div>
            </CardContent>
          </Card>

          {/* Humedad */}

          <Card className="shadow-xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Droplets className="text-blue-500" size={24} />
                Humedad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {weather.main.humidity}
                </div>
                <div className="text-gray-600">%</div>
              </div>
            </CardContent>
          </Card>

          {/* Visibilidad */}

          <Card className="shadow-xl border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Eye className="text-orange-500" size={24} />
                Visibilidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {(weather.visibility / 1000).toFixed(1)}
                </div>
                <div className="text-gray-600">km</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
