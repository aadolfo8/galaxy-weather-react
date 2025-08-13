import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import type React from "react";

interface SearchFormProps {
  city: string;
  onCityChange: (city: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  city,
  onCityChange,
  onSubmit,
  loading,
  error,
}) => {
  return (
    <Card className="mb-8 shadow-xl border-0">
      <CardContent className="p-6">
        <form onSubmit={onSubmit} className="flex gap-4">
          <div className="flex-1 relative">
            <MapPin
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Ingresa el nombre de una ciudad..."
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              className="pl-10 h-12 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <p className="text-pink-500 mt-5 text-center font-medium">{error}</p>
        )}
      </CardContent>
    </Card>
  );
};
