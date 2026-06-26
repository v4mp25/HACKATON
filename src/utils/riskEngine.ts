import type { Crop } from '../types/crop';
import type { WeatherData } from '../types/weather';

export const calculateRisk = (crop: Crop, weather: WeatherData): 'healthy' | 'at-risk' | 'critical' => {
  if (crop.status === 'harvested') return 'healthy';
  
  if (weather.temperature > 35 || weather.temperature < 0) return 'critical';
  if (weather.temperature > 30 || weather.temperature < 5) return 'at-risk';
  if (weather.precipitation > 50) return 'at-risk';
  
  return 'healthy';
};
