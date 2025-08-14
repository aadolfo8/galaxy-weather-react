import { Card } from "@/components/ui/card";
import type { WeatherData } from "@/interfaces/weather-data";
import React from "react";

interface SavedCitiesProps {
  cities: { [name: string]: WeatherData };
  selectedCity: string | null;
  onSelect: (name: string) => void;
}

export const SavedCities: React.FC<SavedCitiesProps> = ({
  cities,
  selectedCity,
  onSelect,
}) => {
  if (Object.keys(cities).length === 0) return null;

  return (
    <Card className="mb-8 shadow-xl border-0 overflow-hidden p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Ciudades guardadas
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Object.entries(cities).map(([name, data]) => (
          <button
            key={name}
            className={`flex flex-col items-center justify-center rounded-lg shadow transition-all border-2
              w-full min-h-[7rem] sm:min-h-[8rem] md:min-h-[9rem] lg:min-h-[10rem]
              ${
                selectedCity === name
                  ? "bg-blue-600 text-white border-blue-600 scale-105"
                  : "bg-white text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
              }`}
            onClick={() => onSelect(name)}
          >
            <span className="font-bold text-lg">{name}</span>
            <span
              className={`text-sm capitalize ${
                selectedCity === name ? "text-blue-200" : "text-gray-500"
              }`}
            >
              {data.weather?.[0]?.description}
            </span>
            <span className="text-xl font-semibold mt-1">
              {Math.round(data.main?.temp)}°C
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
};
