import type { WeatherData, WeatherForecast } from '../types/weather';

export const mockCurrentWeather: WeatherData = {
  temperature: 24.5,
  humidity: 60,
  precipitation: 0,
  windSpeed: 12,
  condition: 'sunny',
  timestamp: Date.now(),
};

export const mockForecast: WeatherForecast[] = [
  { date: '2026-06-27', maxTemp: 26, minTemp: 15, precipitationProb: 10, condition: 'sunny' },
  { date: '2026-06-28', maxTemp: 22, minTemp: 14, precipitationProb: 60, condition: 'rainy' },
  { date: '2026-06-29', maxTemp: 20, minTemp: 12, precipitationProb: 80, condition: 'rainy' },
  { date: '2026-06-30', maxTemp: 25, minTemp: 14, precipitationProb: 20, condition: 'cloudy' },
];
