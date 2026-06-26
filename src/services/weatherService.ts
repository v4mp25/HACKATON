import type { WeatherData, WeatherForecast } from '../types/weather';
import { mockCurrentWeather, mockForecast } from '../data/mockWeather';

export const weatherService = {
  async getCurrentWeather(lat: number, lng: number): Promise<WeatherData> {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      return {
        temperature: data.current_weather.temperature,
        windSpeed: data.current_weather.windspeed,
        humidity: 60,
        precipitation: 0,
        condition: 'sunny',
        timestamp: Date.now()
      };
    } catch (error) {
      console.warn("Using mock weather data due to API failure", error);
      return mockCurrentWeather;
    }
  },
  
  async getForecast(lat: number, lng: number): Promise<WeatherForecast[]> {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
      if (!res.ok) throw new Error('API Error');
      return mockForecast; 
    } catch (error) {
      console.warn("Using mock forecast data", error);
      return mockForecast;
    }
  }
};
